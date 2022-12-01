
import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { SignupUserDto } from "../dtos/signup_user.dto";
import { User } from "../models/user.model";
import authService from "../services/auth.service";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { SigninUserDto } from "../dtos/signin_user.dto";
import { Role } from "../models/role.model";
import authUtils, { IPayload } from "../common/utils/auth.utils";
import { ChangePasswordDto } from "../dtos/change_password.dto";
import rolesService from "../services/roles.service";
import userService from "../services/users.service";
import { ResponseDto } from "../common/dto/response.dto";

class AuthController {

    public token!: IPayload;

    public ping = (req: Request, res: Response) => {

        const response: ResponseDto = {
            code: 200,
            message: 'Hello strange!'
        }

        res.status(response.code!).send(response)

    };

    // Registrarse
    public signup = async (req: Request, res: Response) => {

        try {

            const payload = req.body;
            
            const signupUserDto = plainToClass(SignupUserDto, payload);
            const validatedUser = await authService.validationSignupUser(signupUserDto);

            const newUser = await User.create({ 
                ...validatedUser
            });

            // const searchUser = await User.findOne({ where: { email: validatedUser.email }, include: [{ model: Role }] }).then(info => info?.toJSON());
            const role = await rolesService.getRoleByEmail(validatedUser.email);

            // Token
            // const token = jwt.sign({ email: validatedUser.email, role }, process.env.SECRET_KEY!, { expiresIn: '1day' });
            const accessToken = authUtils.createTokenCookie('access_token', { email: validatedUser.email, role }, process.env.SECRET_KEY_ACCESS_TOKEN!, '20000');
            const refreshToken = authUtils.createTokenCookie('refresh_token', { email: validatedUser.email }, process.env.SECRET_KEY_REFRESH_TOKEN!, '1min');
            
            const response: ResponseDto = {
                code: 201,
                message: 'New user created successfully. Please sign in to the application for use.',
                results: newUser
            };

            res.status(response.code!).cookie('access_token', accessToken.cookie).cookie('refresh_token', refreshToken.cookie).header('Cache-Control', `auth-token: ${accessToken.token}`).send(response);

        } catch (error) {

            if (error instanceof Error) {
                
                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);
            
            }
            
            return res.status(500).send(String(error));
                        
        }

    };

    // Iniciar sesion
    public signin = async (req: Request, res: Response) => {

        try {

            const payload = req.body;
            
            const signinUserDto = plainToClass(SigninUserDto, payload);
            const validatedUser = await authService.validationSigninUser(signinUserDto);
            // const user = await User.findOne({ where: { email: validatedUser.email }, include: [{ model: Role }] }).then(info => info?.toJSON());
            const user = await userService.searchUserInclude(validatedUser.email, Role).then(info => info?.toJSON());

            const signinUser = {
                id: user.id,
                ...validatedUser,
                role: user.role.type
            };

            const response: ResponseDto = {
                code: 200,
                message: 'Successful login.',
                results: signinUser
            };

            // Tokens
            // const token = jwt.sign({ email: validatedUser.email, role: user.role.type }, process.env.SECRET_KEY!, { expiresIn: '1day'});
            const accessToken = authUtils.createTokenCookie('access_token', { email: validatedUser.email, role: user.role.type }, process.env.SECRET_KEY_ACCESS_TOKEN!, '20000');
            const refreshToken = authUtils.createTokenCookie('refresh_token', { email: validatedUser.email }, process.env.SECRET_KEY_REFRESH_TOKEN!, '1min');

            // .cookie('refresh-token', serialized)
            res.status(response.code!).cookie('access_token', accessToken.cookie).cookie('refresh_token', refreshToken.cookie).header('Cache-Control', `auth-token: ${accessToken.token}`).send(response);

        } catch (error) {

            if (error instanceof Error) {
                
                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);
            
            }
            
            return res.status(500).send(String(error));

        }

    };

    // Cerrar sesion
    public signout = async (req: Request, res: Response) => {

        try {

            const response: ResponseDto = {
                code: 200,
                message: 'Session ended, if you wish to use the application again, please sign in again.'
            }

            res.status(response.code!).cookie('access_token', '').cookie('refresh_token', '').send(response);

        } catch (error) {

            if (error instanceof Error) {
                
                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);
            
            }
            
            return res.status(500).send(String(error));
                              
        }

    };

    // Cambiar contraseña
    public changePassword = async (req: Request, res: Response) => {

        try {

            const payload = req.body;

            if (this.token.email !== payload.email) throw new Error(JSON.stringify({ code: 400, message: 'Email does not match!' }));
            
            const changePasswordDto = plainToClass(ChangePasswordDto, payload);
            const validatedUser = await authService.changePassword(changePasswordDto);
            // const user = await User.findOne({ where: { email: validatedUser.email }, include: [{ model: Role }] });
            const user = await userService.searchUserInclude(validatedUser.email, Role);
            
            user?.set({
                password: validatedUser.new_password
            });
            await user?.save();

            const changedPassword = {
                id: user?.dataValues.id,
                old_password: validatedUser.password,
                new_password: validatedUser.new_password,
                role: user?.dataValues.role.type
            };

            const response: ResponseDto = {
                code: 200,
                message: 'Password has been changed successfully.',
                results: changedPassword
            }

            res.status(response.code!).send(response);

        } catch (error) {

            if (error instanceof Error) {
                
                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);
            
            }
            
            return res.status(500).send(String(error));
                              
        }

    };    

    // Verificar Token
    public verifyToken = async (req: Request, res: Response, next: NextFunction) => {
 
        try {

            // console.log(req.cookies);
            // console.log(req.rawHeaders);

            const cookieRefreshToken = (req.cookies.refresh_token !==  undefined) ? req.cookies.refresh_token.split(' ').find((d: string) => d.match(/(refresh_token\=)+([\w]+)/)) : null;
            const refreshToken = (cookieRefreshToken) ? cookieRefreshToken.match(/(refresh_token\=)+?([\w]+\.(\w+\.)+[\w\-]+)/)[2] : null;
            
            const cookieAccessToken = (req.cookies.access_token !==  undefined) ? req.cookies.access_token.split(' ').find((d: string) => d.match(/(access_token\=)+([\w]+)/)) : null;
            
            const accessToken = ((cookieAccessToken) ? cookieAccessToken.match(/(access_token\=)+?([\w]+\.(\w+\.)+[\w\-]+)/)[2] : null) ??
                req.header('auth-token') ?? 
                ((req.rawHeaders.includes('Authorization') && req.rawHeaders.some(f => (/(Bearer auth-token: )+?([\w]+\.(\w+\.)+[\w\-])+/).test(f))) 
                ? req.rawHeaders.find(f => f.match(/(Bearer auth-token: )+?/))!.replace(/(Bearer auth-token: )+?/, '') 
                : null);
                
            if(!accessToken || !refreshToken) throw new Error(JSON.stringify({ code: 401, message: 'Access denied! Please sign in again.' }));

            const validatedRefreshToken = authUtils.verifyTokenPayload(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN!);
            if (typeof validatedRefreshToken === 'string') throw new Error(JSON.stringify({ code: 400, message: 'Token invalid! Please sign in again.' })); 

            let validatedAccessToken = authUtils.verifyTokenPayload(accessToken, process.env.SECRET_KEY_ACCESS_TOKEN!);
            
            if (typeof validatedAccessToken === 'string') { 

                if (validatedAccessToken === 'jwt expired') {
                    
                    const decode = jwt.decode(accessToken, { complete: true });
                    const payload = decode?.payload as IPayload;
                    
                    const newAccessToken = authUtils.createTokenCookie('access_token', { email: payload.email, role: payload.role }, process.env.SECRET_KEY_ACCESS_TOKEN!, '20000');

                    validatedAccessToken = authUtils.verifyTokenPayload(newAccessToken.token, process.env.SECRET_KEY_ACCESS_TOKEN!) as IPayload;

                    console.log('\nNew access_token:', newAccessToken.token);

                    res.cookie('access_token', newAccessToken.cookie);

                } else {
            
                    throw new Error(JSON.stringify({ code: 400, message: 'Token invalid! Please sign in again.' })); 
            
                }
            
            }

            if (!(await userService.searchUserByEmail(validatedAccessToken!.email!))) throw new Error(JSON.stringify({ code: 404, message: 'User not found!' }));

            this.token = validatedAccessToken!;

            next();
           
        } catch (error) {

            if (error instanceof Error) {
                
                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);
            
            }
            
            return res.status(500).send(String(error));
                                    
        }
        
    };

}

export default new AuthController();

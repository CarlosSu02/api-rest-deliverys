
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
            const token = jwt.sign({ email: validatedUser.email, role }, process.env.SECRET_KEY!, { expiresIn: '1day' });

            const response: ResponseDto = {
                code: 201,
                message: 'New user created successfully.',
                results: newUser
            };

            res.status(response.code!).header('Cache-Control', `auth-token: ${token}`).send(response);

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


            // Token
            const token = jwt.sign({ email: validatedUser.email, role: user.role.type }, process.env.SECRET_KEY!, { expiresIn: '1day'});

            res.status(response.code!).header('Cache-Control', `auth-token: ${token}`).send(response);

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

            const token = req.header('auth-token');
        
            if(!token) throw new Error(JSON.stringify({ code: 401, message: 'Access denied!' }));
        
            if(!token.match(/^[\w]+\.(\w+\.)+[\w\-]+$/)) throw new Error(JSON.stringify({ code: 400, message: 'Token invalid!' }));

            const validatedToken = authUtils.verifyTokenPayload(token); 

            if (!(await userService.searchUserByEmail(validatedToken!.email!))) throw new Error(JSON.stringify({ code: 404, message: 'User not found!' }));

            // res.status(200).send(payload);
            this.token = validatedToken!;

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

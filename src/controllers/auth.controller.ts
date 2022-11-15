
import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { SignupUserDto } from "../dtos/signup_user.dto";
import { User } from "../models/user.model";
import authService from "../services/auth.service";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { SigninUserDto } from "../dtos/signin_user.dto";
import { Role } from "../models/role.model";
import authUtils, { IPayload } from "../utils/auth.utils";
import { ChangePasswordDto } from "../dtos/change_password.dto";

class AuthController {

    public token!: IPayload;

    public ping = (req: Request, res: Response) => {

        res.status(200).json({
            message: 'Hello strange!'
        })

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

            const searchUser = await User.findOne({ where: { email: validatedUser.email }, include: [{ model: Role }] }).then(info => info?.toJSON());

            // Token
            const token = jwt.sign({ email: validatedUser.email, role: searchUser.role.type }, process.env.SECRET_KEY!, { expiresIn: '1day' });

            res.status(201).header('Cache-Control', `auth-token: ${token}`).send(newUser);

        } catch (error) {

            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));
            
        }

    };

    // Iniciar sesion
    public signin = async (req: Request, res: Response) => {

        try {

            const payload = req.body;
            
            const signinUserDto = plainToClass(SigninUserDto, payload);
            const validatedUser = await authService.validationSigninUser(signinUserDto);
            const user = await User.findOne({ where: { email: validatedUser.email }, include: [{ model: Role }] }).then(info => info?.toJSON());

            const signinUser = {
                id: user.id,
                ...validatedUser,
                role: user.role.type
            };

            // Token
            const token = jwt.sign({ email: validatedUser.email, role: user.role.type }, process.env.SECRET_KEY!, { expiresIn: '1day'});

            res.status(200).header('Cache-Control', `auth-token: ${token}`).send(signinUser);

        } catch (error) {

            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));
            
        }

    };

    // Cambiar contraseña
    public changePassword = async (req: Request, res: Response) => {

        try {

            const payload = req.body;
            
            const changePasswordDto = plainToClass(ChangePasswordDto, payload);
            const validatedUser = await authService.changePassword(changePasswordDto);
            const user = await User.findOne({ where: { email: validatedUser.email }, include: [{ model: Role }] });

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

            res.status(200).send(changedPassword);

        } catch (error) {

            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));
            
        }

    };    

    // Verificar Token
    public verifyToken = async (req: Request, res: Response, next: NextFunction) => {
 
        try {

            const token = req.header('auth-token');
        
            if(!token) throw new Error(JSON.stringify({ message: 'Access denied!' }));
        
            if(!token.match(/^[\w]+\.(\w+\.)+[\w\-]+$/)) throw new Error(JSON.stringify({ message: 'Token invalid!' }));

            const validatedToken = authUtils.verifyTokenPayload(token); 

            if (!(await authService.searchUserByEmail(validatedToken.email!))) throw new Error(JSON.stringify({ message: 'User not found!' }));

            // res.status(200).send(payload);
            this.token = validatedToken;

            next();
           
        } catch (error) {

            (error instanceof Error) ? res.status(401).send(error.message) : res.status(401).send(String(error));
            
        }
        
    };

}

export default new AuthController();

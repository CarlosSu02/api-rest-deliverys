
import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { UpdateInfoUserDto } from "../dtos/update_info_user.dto";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";
import usersService from "../services/users.service";
import authController from "./auth.controller";
import authService from "../services/auth.service";
import { ResponseDto } from "../common/dto/response.dto";
import { SigninUserDto } from "../dtos/signin_user.dto";

class UserController {

    // superadmin
    public getUsers = async (req: Request, res: Response) => {

        try {

            if (authController.token.role !== 'Superadmin') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to list the roles!'}));

            const users = await usersService.getUsers();

            res.status(users.code!).send(users);
            
        } catch (error) {

            if (error instanceof Error) {
                
                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);
            
            }
            
            return res.status(500).send(String(error));
            
        }

    };

    public profile = async (req: Request, res: Response) => {

        try {

            const { email } = authController.token;
            
            const user = await usersService.profile(email);

            const response: ResponseDto = {
                code: 200,
                message: 'Profile.',
                results : user
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

    public updateUser = async (req: Request, res: Response) => {

        try {

            const payload = req.body;
            const { email } = authController.token;
            
            const updateInfoUserDto = plainToClass(UpdateInfoUserDto, payload);
            const validatedUser = await usersService.validationUpdateInfoUser(updateInfoUserDto, email);
            const user = await User.findOne({ where: { email }, include: [{ model: Role }] });

            user?.set({
                ...validatedUser
            });
            await user?.save();

            const updatedInfoUser = {
                id: user?.dataValues.id,
                ...validatedUser
            };

            const response: ResponseDto = {
                code: 200,
                message: 'User has been updated successfully.',
                results : updatedInfoUser
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

    // Para este de momento, es que la confirmacion de eliminar el perfil sea el inicio de sesion valido.
    public deleteUser = async (req: Request, res: Response) => {

        try {

            const payload = req.body;
            
            if (authController.token.email !== payload.email) throw new Error(JSON.stringify({ code: 400, message: 'Email does not match!' }));

            const signinUserDto = plainToClass(SigninUserDto, payload);
            const validatedUser = await authService.validationSigninUser(signinUserDto);
           
            await User.destroy({ where: { email: validatedUser.email } }); 
            
            const response: ResponseDto = {
                code: 200,
                message: `The user with email '${validatedUser.email}' deleted successfully.`
            }

            res.status(response.code!).cookie('access_token', '').cookie('refresh_token', '').send(response);

        } catch (error) {

            if (error instanceof Error) {

                console.log(error);
                
                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);
            
            }
            
            return res.status(500).send(String(error));

        }       

    };

}

export default new UserController();

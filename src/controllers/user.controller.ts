
import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { UpdateInfoUserDto } from "../dtos/update_info_user.dto";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";
import usersService from "../services/users.service";
import authController from "./auth.controller";

class UserController {

    public profile = async (req: Request, res: Response) => {

        try {

            const { email } = authController.token;
            
            const user = await usersService.profile(email);

            res.status(200).send(user);

        } catch (error) {

            (error instanceof Error) ? res.status(401).send(error.message) : res.status(401).send(String(error));
            
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

            res.status(200).send(updatedInfoUser);

        } catch (error) {

            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));
            
        }       


    };

}

export default new UserController();

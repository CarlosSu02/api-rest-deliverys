
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { ResponseDto } from '../common/dto/response.dto';
import generalUtils from '../common/utils/general.utils';
import { CreateRoleDto } from '../dtos/create_role.dto';
import { Role } from '../models/role.model';
import rolesService from '../services/roles.service';
import authController from './auth.controller';

class RoleController {

    private roles = [
        {
            type: 'vendedor'
        },
        {
            type: 'comprador'
        }
    ];

    public getRoles = async (req: Request, res: Response) => {

        try {

            if (authController.token.role === 'comprador') {
                
                const response = plainToClass(ResponseDto, { code: 401, message: 'You do not have permission to list the roles!'});
                const validatedResponse = await generalUtils.errorsFromValidate(response);

                if (validatedResponse !== undefined) throw new Error(JSON.stringify(validatedResponse));

                throw new Error(JSON.stringify(response));
            
            }

            const roles = await rolesService.getRoles();

            res.status(roles.code!).send(roles);
            
        } catch (error) {

            if (error instanceof Error) {
                
                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);
            
            }
            
            return res.status(500).send(String(error));
            
        }

    };

    public createRole = async (req: Request, res: Response) => {

        try {

            const payload = req.body;

            const createRoleDto = plainToClass(CreateRoleDto, payload);
            const validatedRole = await rolesService.validationAddRole(createRoleDto);

            const newUser = await Role.create({
                ...validatedRole
            });

            const response: ResponseDto = {
                code: 201,
                message: 'New role created successfully.',
                results: newUser
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

    // Insert roles in the DB
    public insertRoles = async () => {

        try {

            const countRoles = await Role.findAndCountAll().then(info => info.count);

            if (countRoles === 0) {

                console.log(`\nThis is the first run of the application \nInserted roles in database from Array`);

                this.roles.forEach(async (rol) => {
                    
                    await Role.create(rol);

                });

            }
           
            
        } catch (error) {

            (error instanceof Error) ? console.log(error.message) :  console.log(String(error));
            
        }

    };

}

export default new RoleController();

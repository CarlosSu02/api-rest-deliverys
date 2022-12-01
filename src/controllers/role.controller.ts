
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { ResponseDto } from '../common/dto/response.dto';
import { CreateRoleDto } from '../dtos/create_role.dto';
import { Role } from '../models/role.model';
import rolesService from '../services/roles.service';
import authController from './auth.controller';

class RoleController {

    private roles = [
        {
            id: 9999,
            type: 'Superadmin'
        },
        {
            type: 'Seller'
        },
        {
            type: 'Buyer'
        }
    ];

    // superadmin
    public getRoles = async (req: Request, res: Response) => {

        try {

            if (authController.token.role !== 'Superadmin') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to list the roles!'}));

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

            if (authController.token.role !== 'Superadmin') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to list the roles!'}));

            const payload = req.body;

            const createRoleDto = plainToClass(CreateRoleDto, payload);
            const validatedRole = await rolesService.validationAddRole(createRoleDto);

            const newRole = await Role.create({
                ...validatedRole
            });

            const response: ResponseDto = {
                code: 201,
                message: 'New role created successfully.',
                results: newRole
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

    public updateRole = async (req: Request, res: Response) => {

        try {

            if (authController.token.role !== 'Superadmin') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to list the roles!'}));
        
            const { id } = req.params;

            const role = await rolesService.getRoleById(+id);

            const updateRoleDto = plainToClass(CreateRoleDto, req.body);
            const validatedRole = await rolesService.validationAddRole(updateRoleDto);

            role.set({ ...validatedRole });
            await role.save();

            const response: ResponseDto = {
                code: 200,
                message: 'Role updated successfully.',
                results: {
                    id: role.dataValues.id,
                    ...validatedRole
                }
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

    public deleteRole = async (req: Request, res: Response) => {

        try {

            if (authController.token.role !== 'Superadmin') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to list the roles!'}));
        
            const { id } = req.params;

            const role = await rolesService.getRoleById(+id);

            await Role.destroy({ where: { id } });

            const response: ResponseDto = {
                code: 200,
                message: `The role '${role.dataValues.type}' deleted successfully.`,
                results: {
                    ...role.dataValues
                }
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

                console.log(`\nThis is the first run of the application. \nInserted roles in database from Array.`);

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

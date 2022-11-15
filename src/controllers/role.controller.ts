
import { Request, Response } from 'express';
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

            if (authController.token.role === 'comprador') throw new Error(JSON.stringify({ message: 'You do not have permission to list the roles!' })); 

            const roles = await rolesService.getRoles();

            res.status(200).send(roles);
            
        } catch (error) {

            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));
            
        }

    };

    // Insert roles in the DB
    public insertRoles = async () => {

        try {

            const countRoles = await Role.findAndCountAll().then(info => info.count);

            if (countRoles === 0) {

                console.log(`\nThis is the first run of the application \nInsert roles in database from Array`);

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

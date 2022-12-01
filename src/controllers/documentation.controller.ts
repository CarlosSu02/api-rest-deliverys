
import { Request, Response } from 'express';
import 'dotenv/config';
import { ResponseDto } from '../common/dto/response.dto';

class DocumentationController {

    public documentation = async (req: Request, res: Response) => {

        try {

            const PORT = process.env.APP_PORT;

            const info: ResponseDto = {
                code: 200,
                message: 'To consume this api refer to the following routes.',
                results: [
                    {
                        section: 'roles',
                        description: 'List of available requests for the roles.',
                        access: 'Superadmin [CRUD]',
                        routes: [
                            {
                                method: 'GET',
                                url: `http://localhost:${PORT}/api/roles`,
                            },
                            {
                                method: 'POST',
                                url: `http://localhost:${PORT}/api/roles`,
                            },
                            {
                                method: 'PATCH',
                                url: `http://localhost:${PORT}/api/roles/1`,
                            },
                            {
                                method: 'DELETE',
                                url: `http://localhost:${PORT}/api/roles/1`,
                            },
                        ],
                    },
                    {
                        section: 'auth',
                        description: 'List of available requests for the auth.',
                        access: 'All users.',
                        routes: [
                            {
                                method: 'POST',
                                url: `http://localhost:${PORT}/api/auth/signup`,
                            },
                            {
                                method: 'POST',
                                url: `http://localhost:${PORT}/api/auth/signin`,
                            },
                            {
                                method: 'PATCH',
                                url: `http://localhost:${PORT}/api/auth/change_password`,
                            },
                            {
                                method: 'DELETE',
                                url: `http://localhost:${PORT}/api/auth/signout`,
                            },
                        ],
                    },
                    {
                        section: 'users',
                        description: 'List of available requests for the users.',
                        access: 'All users.',
                        routes: [
                            {
                                method: 'GET',
                                url: `http://localhost:${PORT}/api/user/users`,
                            },
                            {
                                method: 'GET',
                                url: `http://localhost:${PORT}/api/user/profile`,
                            },
                            {
                                method: 'PATCH',
                                url: `http://localhost:${PORT}/api/user/update`,
                            },
                            {
                                method: 'DELETE',
                                url: `http://localhost:${PORT}/api/user/delete`,
                            },
                        ],
                    },
                    {
                        section: 'bills',
                        description: 'List of available requests for the bills.',
                        access: 'Buyer [RP] and Seller [R].',
                        routes: [
                            {
                                method: 'GET',
                                url: `http://localhost:${PORT}/api/bills/user`,
                            },
                            {
                                method: 'GET',
                                url: `http://localhost:${PORT}/api/bills`,
                            },
                            {
                                method: 'POST',
                                url: `http://localhost:${PORT}/api/bills`,
                            },
                        ],
                    },
                    {
                        section: 'ingredients',
                        description: 'List of available requests for the ingredients.',
                        access: 'Seller.',
                        routes: [
                            {
                                method: 'GET',
                                url: `http://localhost:${PORT}/api/ingredients`,
                            },
                            {
                                method: 'POST',
                                url: `http://localhost:${PORT}/api/ingredients`,
                            },
                            {
                                method: 'PATCH',
                                url: `http://localhost:${PORT}/api/ingredients/1`,
                            },
                            {
                                method: 'DELETE',
                                url: `http://localhost:${PORT}/api/ingredients/1`,
                            },
                        ],
                    },
                    {
                        section: 'products',
                        description: 'List of available requests for the products.',
                        access: 'Seller.',
                        routes: [
                            {
                                method: 'GET',
                                url: `http://localhost:${PORT}/api/products`,
                            },
                            {
                                method: 'POST',
                                url: `http://localhost:${PORT}/api/products`,
                            },
                            {
                                method: 'POST',
                                url: `http://localhost:${PORT}/api/products/superadmin`,
                                user: 'Only Superadmin'
                            },
                            {
                                method: 'PATCH',
                                url: `http://localhost:${PORT}/api/products/1`,
                            },
                            {
                                method: 'DELETE',
                                url: `http://localhost:${PORT}/api/products/1`,
                            },
                        ],
                    },
                    {
                        section: 'categories',
                        description: 'List of available requests for the categories.',
                        access: 'Seller.',
                        routes: [
                            {
                                method: 'GET',
                                url: `http://localhost:${PORT}/api/categories`,
                            },
                            {
                                method: 'POST',
                                url: `http://localhost:${PORT}/api/categories`,
                            },
                            {
                                method: 'PATCH',
                                url: `http://localhost:${PORT}/api/categories/1`,
                            },
                            {
                                method: 'DELETE',
                                url: `http://localhost:${PORT}/api/categories/1`,
                            },
                        ],
                    },
                    {
                        section: 'recipes',
                        description: 'List of available requests for the recipes.',
                        access: 'All users.',
                        routes: [
                            {
                                method: 'GET',
                                url: `http://localhost:${PORT}/api/recipes`,
                            },
                            {
                                method: 'POST',
                                url: `http://localhost:${PORT}/api/recipes`,
                            },
                            {
                                method: 'DELETE',
                                url: `http://localhost:${PORT}/api/recipes/1`,
                            },
                        ],
                    },
                ],
            };

            res.status(info.code!).send(info);

        } catch (error) {

            if (error instanceof Error) {

                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);

            }

            return res.status(500).send(String(error));

        }

    }

}

export default new DocumentationController();

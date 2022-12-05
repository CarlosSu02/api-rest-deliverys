
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
                                example_body: [
                                    {
                                        "type": "example"
                                    }
                                ]
                            },
                            {
                                method: 'PATCH',
                                url: `http://localhost:${PORT}/api/roles/1`,
                                example_body: [ 
                                    {
                                        "type": "example"
                                    }
                                ]
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
                                example_body: [
                                    {
                                        "name": "example",
                                        "phone": 12345678,
                                        "address": "example",
                                        "email": "example@gmail.com",
                                        "password": "example",
                                        "roleId": 1
                                    }
                                ]
                            },
                            {
                                method: 'POST',
                                url: `http://localhost:${PORT}/api/auth/signin`,
                                example_body: [
                                    {
                                        "email": "example@gmail.com",
                                        "password": "example",
                                    }
                                ]
                            },
                            {
                                method: 'PATCH',
                                url: `http://localhost:${PORT}/api/auth/change_password`,
                                example_body: [
                                    {
                                        "email": "example@gmail.com",
                                        "password": "example",
                                        "new_password": "exampleNewPassword"
                                    }
                                ]
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
                                user: 'Only Superadmin',
                            },
                            {
                                method: 'GET',
                                url: `http://localhost:${PORT}/api/user/profile`,
                            },
                            {
                                method: 'PATCH',
                                url: `http://localhost:${PORT}/api/user/update`,
                                note: 'May be less data.',
                                example_body: [
                                    {
                                        "name": "example update",
                                        "phone": 87654321,
                                        "address": "example update",
                                        "roleId": 9999
                                    }
                                ]
                            },
                            {
                                method: 'DELETE',
                                url: `http://localhost:${PORT}/api/user/delete`,
                                example_body: [
                                    {
                                        "email": "example@gmail.com",
                                        "password": "example"
                                    }
                                ]
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
                                example_body: [
                                    {
                                        "paymentForm": "credit card, bank transfer or paypal",
                                        "products": [
                                          {
                                                "product": "example product 1",
                                                "amount": 1,
                                                "store": "example store 1"
                                            },
                                            {
                                                "product": "example product 2",
                                                "amount": 1,
                                                "store": "example store 2"                                            
                                            },
                                            {
                                                "product": "example product 3",
                                                "amount": 1,
                                                "store": "example store 3"
                                            }
                                        ]
                                    }
                                ]
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
                                example_body: [
                                    {
                                        "name": "coffee",
                                        "amount": 1223,
                                        "unit_measure": 3442,
                                        "cost": 223,
                                        "stock": 345
                                    }
                                ]
                            },
                            {
                                method: 'PATCH',
                                url: `http://localhost:${PORT}/api/ingredients/1`,
                                example_body: [
                                    {
                                        "name": "exported coffee",
                                        "amount": 1223,
                                        "unit_measure": 3442,
                                        "cost": 223,
                                        "stock": 345
                                    }
                                ]
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
                                example_body: [
                                    {
                                        "name": "example",
                                        "description": "example description",
                                        "price": 30,
                                        "priceNotTax": 28,
                                        "isElaborate": false,
                                        "stock": 50,
                                        "size": "8 onz",
                                        "categoryId": 2
                                    }
                                ]
                            },
                            {
                                method: 'POST',
                                url: `http://localhost:${PORT}/api/products/superadmin`,
                                user: 'Only Superadmin',
                                example_body: [
                                    {
                                        "name": "example",
                                        "description": "example description",
                                        "price": 100,
                                        "priceNotTax": 28,
                                        "isElaborate": true,
                                        "stock": 50,
                                        "size": "8 onz",
                                        "categoryId": 3,
                                        "sellerEmail": "exampleseller@gmail.com"
                                    }
                                ]
                            },
                            {
                                method: 'PATCH',
                                url: `http://localhost:${PORT}/api/products/1`,
                                example_body: [
                                    {
                                        "name": "edit example",
                                        "description": "edit example description",
                                        "price": 30,
                                        "priceNotTax": 28,
                                        "totalPrice": 30,
                                        "isElaborate": false,
                                        "stock": 50,
                                        "size": "8 onz",
                                        "categoryId": 3
                                    }
                                ]
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
                                example_body: [
                                    {
                                        "name": "example category"
                                    }
                                ]
                            },
                            {
                                method: 'PATCH',
                                url: `http://localhost:${PORT}/api/categories/1`,
                                example_body: [
                                    {
                                        "name": "edit category seller"
                                    }
                                ]
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
                        access: 'Superadmin [CRD], Seller [CRD] and others users [R].',
                        routes: [
                            {
                                method: 'GET',
                                url: `http://localhost:${PORT}/api/recipes`,
                            },
                            {
                                method: 'POST',
                                url: `http://localhost:${PORT}/api/recipes`,
                                example_body: [
                                    {
                                        "ingredientId": 4,
                                        "productId": 5
                                    }
                                ]
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

    };

}

export default new DocumentationController();


import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { ResponseDto } from '../common/dto/response.dto';
import { CreateProductDto } from '../dtos/create_product.dto';
import { Product } from '../models/product.model';
import productsService from '../services/products.service';
import usersService from '../services/users.service';
import authController from './auth.controller';

class ProductController{

    public getProducts = async(req: Request, res: Response) => {

        try {

            const products = await productsService.getProducts();

            return res.status(products.code!).send(products);
            
        } catch (error) {

            if(error instanceof Error){

                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);

            }

            return res.status(500).send(String(error));

        }

    };

    public createProduct = async(req: Request, res: Response) => {

        try {

            if(authController.token.role === 'Buyer') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to add products!' }))
            
            const createProductDto = plainToClass(CreateProductDto, req.body);

            createProductDto.sellerId = await usersService.searchUserByEmail(authController.token.email).then(u => u?.dataValues.id);
            
            const validatedProduct = await productsService.validationAddProduct(createProductDto);

            // validatedProduct.sellerId = await usersService.searchUserByEmail(authController.token.email).then(u => u?.dataValues.id);

            await productsService.searchProductBySeller(validatedProduct.name, validatedProduct.sellerId!);

            const newProduct = await Product.create({
                ...validatedProduct
            });

            const response: ResponseDto = {
                code: 200,
                message: 'The new product created successfully.',
                results: newProduct
            }

            return res.status(response.code!).send(response);
            
        } catch (error) {
            
            if(error instanceof Error){

                const info = JSON.parse(error.message);
                
                return res.status(info.code).send(info);

            }

            return res.status(500).send(String(error));

        }

    };

    public updateProduct = async(req: Request, res: Response) => {

        try {

            if(authController.token.role === 'Buyer') throw new Error(JSON.stringify({ code: 401, message: 'You dont have permission to edit products!' }));

            const { id } = req.params;

            const product = await productsService.searchProductById(+id);

            const updateProductDto = plainToClass(CreateProductDto, req.body);
            const validatedProduct = await productsService.validationAddProduct(updateProductDto);

            product.set({...validatedProduct});
            await product.save();

            const response: ResponseDto = {
                code: 200,
                message: 'Product updated successfully.',
                results: validatedProduct
            }
            
            return res.status(response.code!).send(response);
            
        } catch (error) {

            if(error instanceof Error){

                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);

            }

            return res.status(500).send(String(error));

        }

    };

    public deteleProduct = async(req: Request, res: Response) => {

        try {

            if(authController.token.role === 'Buyer') throw new Error(JSON.stringify({ code: 401, message: 'You dont have permission to delete products!' }));

            const { id } = req.params;

            const product = await productsService.searchProductById(+id);

            await Product.destroy({ where: { id: id }});

            const response: ResponseDto = {
                code: 200,
                message: `The product ${product.dataValues.name} deleted successfully.`,
                results: {
                    ...product.dataValues
                }
            }

            return res.status(response.code!).send(response);
            
        } catch (error) {
            
            if(error instanceof Error){

                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);

            }

            return res.status(500).send(String(error));

        }

    };

}

export default new ProductController();

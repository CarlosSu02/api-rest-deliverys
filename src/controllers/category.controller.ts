
import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { ResponseDto } from "../common/dto/response.dto";
import { CreateCategoryDto } from "../dtos/create_category.dto";
import { Category } from "../models/category.model";
import categoriesService from "../services/categories.service";
import authController from "./auth.controller";

class CategoriesController{

    public getCategories = async (req: Request, res: Response) => {

        try {

            const categories = await categoriesService.getCategories(authController.token.role);

            res.status(categories.code!).send(categories);
            
        } catch (error) {

            if (error instanceof Error) {
                
                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);
            
            }
            
            return res.status(500).send(String(error));
            
        }

    };

    public createCategory = async (req: Request, res: Response) => {
        
        try {

            if (authController.token.role === 'Comprador') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to create categories!'}));

            const payload = req.body;
            const createCategoryDto = plainToClass(CreateCategoryDto, payload);
            const validatedCategory = await categoriesService.validationAddCategory(createCategoryDto);

            const newCategory = await Category.create({
                ...validatedCategory
            });

            const response: ResponseDto = {
                code: 201,
                message: 'The new category created successfully.',
                results: newCategory
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

    public updateCategory = async (req: Request, res: Response) => {

        try {

            if (authController.token.role === 'Comprador') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to create categories!'}));

            const { id } = req.params;

            const category = await categoriesService.searchCategoryById(+id);

            const updateCategoryDto = plainToClass(CreateCategoryDto, req.body);
            const validatedCategory = await categoriesService.validationAddCategory(updateCategoryDto);

            category.set({ ...validatedCategory });
            await category.save();

            const response: ResponseDto = {
                code: 200,
                message: 'Category updated successfully.',
                results: validatedCategory
            }

            res.status(response.code!).send(response);
            
        } catch (error) {

            if (error instanceof Error) {
                                
                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);
            
            }
            
            return res.status(500).send(String(error));
            
        }

    }

    public deleteCategory = async (req: Request, res: Response) => {

        try {

            if(authController.token.role === "Comprador") throw new Error(JSON.stringify({ code: 404, message: 'You dont have permission to delete categories!' }));

            const { id } = req.params;
            const category = await categoriesService.searchCategoryById(+id); 

            await Category.destroy({ where: { id } });

            const response: ResponseDto = {
                code: 200,
                message: `The category ${category.dataValues.name} deleted successfully.`,
                results: {
                    ...category.dataValues
                }
            }

            res.status(response.code!).send(response);

        } catch (error) {
            
            if(error instanceof Error){

                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);
            }

            return res.status(500).send(String(error));

        }

    }

}


export default new CategoriesController();
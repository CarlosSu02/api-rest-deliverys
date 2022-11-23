
import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { ResponseDto } from "../common/dto/response.dto";
import { CreateIngredientDto } from "../dtos/create_ingredient.dto";
import { Ingredient } from "../models/ingredient.model";
import ingredientsService from "../services/ingredients.service";
import authController from "./auth.controller";

class IngredientController{

    public getIngredients = async(req: Request, res: Response) => {

        try {

            const ingredients = await ingredientsService.getIngredients(authController.token.role);

            return res.status(ingredients.code!).send(ingredients);
            
        } catch (error) {
            
            if(error instanceof Error){

                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);

            }

            return res.status(500).send(String(error));
        }

    }

    public createIngredient = async(req: Request, res: Response) => {

        try {

            if(authController.token.role === 'Buyer') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to add ingredients!' }))

            const payload = req.body;

            const createIngredientDto = plainToClass(CreateIngredientDto, payload);
            const validatedIngredient = await ingredientsService.validationAddIngredient(createIngredientDto);

            const newIngredient = await Ingredient.create({
                ...validatedIngredient
            });

            const response: ResponseDto = {
                code: 201,
                message: 'The new ingredient created successfully.',
                results: newIngredient
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

    public updateIngredient = async(req: Request, res: Response) => {

        try {

            if(authController.token.role === 'Buyer') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to edit ingredients!' }))

            const { id } = req.params;

            const ingredient = await ingredientsService.searchIngredientsById(+id);
            
            const updateIngredientDto = plainToClass(CreateIngredientDto, req.body);
            const validatedIngredient = await ingredientsService.validationAddIngredient(updateIngredientDto);

            ingredient.set({ ...validatedIngredient });
            await ingredient.save();

            const response: ResponseDto = {
                code: 200,
                message: 'Ingredient updated successfully.',
                results: validatedIngredient
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

    public deleteIngredient = async(req: Request, res: Response) => {

        try {

            if(authController.token.role === 'Buyer') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to delete ingredients!'  }));
            
            const { id } = req.params;

            const ingredient = await ingredientsService.searchIngredientsById(+id);

            await Ingredient.destroy({ where: { id: id }});
            
            const response: ResponseDto = {
                code: 200,
                message: `The ingredient '${ingredient.dataValues.name}' deleted successfully.`,
                results: {
                    ...ingredient.dataValues
                }
            }

            return res.status(response.code!).send(response)

        } catch (error) {
            
            if(error instanceof Error){

                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);

            }

            return res.status(500).send(String(error));

        }

    }

}

export default new IngredientController();
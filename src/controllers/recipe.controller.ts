
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { ResponseDto } from '../common/dto/response.dto';
import { CreateRecipeDto } from '../dtos/create_recipe.dto';
import { Recipe } from '../models/recipe.model';
import recipesService from '../services/recipes.service';
import authController from './auth.controller';

class RecipeController{

    public getRecipes = async(req: Request, res: Response) => {

        try {

            const recipes = await recipesService.getRecipes();

            return res.status(recipes.code!).send(recipes);
            
        } catch (error) {

            if(error instanceof Error){

                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);

            }

            return res.status(500).send(String(error));

        }

    };

    public createRecipe = async(req: Request, res: Response) => {

        try {

            if (authController.token.role === 'Buyer') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to create recipes!'}));

            const payload = req.body;
            const createRecipeDto = plainToClass(CreateRecipeDto, payload);
            const validatedRecipe = await recipesService.validationAddRecipe(createRecipeDto);

            const newRecipe = await Recipe.create({
                ...validatedRecipe
            });

            const response: ResponseDto = {
                code: 201,
                message: 'The new recipe created successfully.',
                results: newRecipe
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

    public deleteRecipe = async(req: Request, res: Response) => {

        try {

            if(authController.token.role === 'Buyer') throw new Error(JSON.stringify({ code: 401, message: 'You dont have permission to delete recipes!' }));

            const { id } = req.params;

            const recipe = await recipesService.searchRecipeByProductId(+id);

            await Recipe.destroy({ where: { productId: id }});

            const response: ResponseDto = {
                code: 200,
                message: `The recipe was deleted successfully.`,
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

export default new RecipeController();
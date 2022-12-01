
import { ResponseDto } from "../common/dto/response.dto";
import generalUtils from "../common/utils/general.utils";
import { CreateRecipeDto } from "../dtos/create_recipe.dto";
import { Ingredient } from "../models/ingredient.model";
import { Product } from "../models/product.model";
import { Recipe } from "../models/recipe.model";
import ingredientsService from "./ingredients.service";
import productsService from "./products.service";

interface Recipe {
    product: string,
    ingredients: string[]
}

class RecipesServices {

    public getRecipes = async (): Promise<ResponseDto> => {

        // var recipesData, messageToReturn;
        // const searchAllRecipes = await Recipe.findAndCountAll({ include: [{ model: Ingredient, attributes: ['name'] }, { model: Product, attributes: ['name'] }] });
        const searchAllRecipes = await Product.findAll({ include: [{ model: Recipe, include: [{ model: Ingredient,  attributes: ['name'] }] }] });

        if (searchAllRecipes.length === 0) throw new Error(JSON.stringify({ code: 500, message: 'There are not recipes added!' }));

        const recipes = searchAllRecipes.map(data => {

            let recipe: Recipe = {
                product:  data.dataValues.name,
                ingredients: []
            };

            data.dataValues.recipes.map((ing: any) => {

                recipe.ingredients.push(ing.dataValues.ingredient.dataValues.name);
            
            });

            return recipe;

        });

        return {
            code: 200,
            message: 'List of all Recipes.',
            count: searchAllRecipes.length,
            results: recipes
        };

    };

    public validationAddRecipe = async (recipe: CreateRecipeDto): Promise<CreateRecipeDto> => {

        const errors = await generalUtils.errorsFromValidate(recipe);

        if (errors !== undefined) throw new Error(JSON.stringify(errors));

        //recipe.productId = generalUtils.formattingWords(recipe.productId);

        await productsService.searchProductById(recipe.productId);
        await ingredientsService.searchIngredientsById(recipe.ingredientId);
        await this.searchRecipeByProductIdAndIngredientId(recipe.productId, recipe.ingredientId);

        // if ((await this.searchRecipeByProductId(recipe.productId))) {
           
        //     return recipe;

        // }else {

        //     throw new Error(JSON.stringify({ code: 404, message: 'Product do not exists!' }));
        // }

        return recipe;

    };

    public searchRecipeByProductIdAndIngredientId = async (productId: number, ingredientId: number) => {

        let recipe = await Recipe.findOne({ where: { productId, ingredientId } });

        if(recipe !== null) throw new Error(JSON.stringify({ code: 404, message: 'Recipe already exists!' }));

        return recipe;

    };

    public searchRecipeByProductId = async (productId: number) => {

        let recipe = await Recipe.findByPk(productId);

        if(recipe === null) throw new Error(JSON.stringify({ code: 404, message: 'Recipe is not exists!' }));

        return recipe;

    };

}

export default new RecipesServices();
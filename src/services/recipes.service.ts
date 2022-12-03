
import { ResponseDto } from "../common/dto/response.dto";
import generalUtils from "../common/utils/general.utils";
import authController from "../controllers/auth.controller";
import { CreateRecipeDto } from "../dtos/create_recipe.dto";
import { Ingredient } from "../models/ingredient.model";
import { Product } from "../models/product.model";
import { Recipe } from "../models/recipe.model";
import { User } from "../models/user.model";
import ingredientsService from "./ingredients.service";
import productsService from "./products.service";

interface Recipe {
    seller: string,
    product: string,
    ingredients: string[]
}

class RecipesServices {

    public getRecipes = async (): Promise<ResponseDto> => {

        const searchAllRecipes = await Product.findAll({ include: [{ model: Recipe, include: [{ model: Ingredient,  attributes: ['name'] }] }, { model: User, attributes: ['name'] }] });

        if (searchAllRecipes.length === 0) throw new Error(JSON.stringify({ code: 500, message: 'There are not recipes added!' }));

        const recipes = searchAllRecipes.map(data => {

            let recipe: Recipe = {
                seller: data.dataValues.user.name,
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

        await productsService.searchProductById(recipe.productId);
        await ingredientsService.searchIngredientsById(recipe.ingredientId);

        const ownerProduct = await Product.findByPk(recipe.productId, { include: [{ model: User, attributes: ['id', 'email'] }] }).then(data => data?.dataValues.user.dataValues.email);
        const productsUser = await Product.findAll({ include: [{ model: User, where: { email: authController.token.email }, attributes: [] }], attributes: ['id', 'name'], order: [['id', 'ASC']] });
        
        if (ownerProduct !== authController.token.email) throw new Error(JSON.stringify({ code: 400, message: 'You are not the owner of this product! You have the following products...', results: productsUser }));

        await this.searchRecipeByProductIdAndIngredientId(recipe.productId, recipe.ingredientId);

        return recipe;

    };

    public searchRecipeByProductIdAndIngredientId = async (productId: number, ingredientId: number) => {

        let recipe = await Recipe.findOne({ where: { productId, ingredientId } });

        if (recipe !== null) throw new Error(JSON.stringify({ code: 404, message: 'Recipe already exists!' }));

        return recipe;

    };

    public searchRecipeByProductId = async (productId: number) => {

        let recipe = await Recipe.findByPk(productId);

        if(recipe === null) throw new Error(JSON.stringify({ code: 404, message: 'Recipe is not exists!' }));

        return recipe;

    };

}

export default new RecipesServices();
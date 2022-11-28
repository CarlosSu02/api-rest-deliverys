import { ResponseDto } from "../common/dto/response.dto";
import generalUtils from "../common/utils/general.utils";
import { CreateRecipeDto } from "../dtos/create_recipe.dto";
import { Product } from "../models/product.model";
import { Recipe } from "../models/recipe.model";

class RecipesServices {

    public getRecipes = async (): Promise<ResponseDto> => {

        var recipesData, messageToReturn;
        const searchAllRecipes = await Recipe.findAndCountAll();

        if (searchAllRecipes.count === 0) throw new Error(JSON.stringify({ code: 500, message: 'There are not recipes added!' }));

            recipesData = searchAllRecipes.rows; 
            messageToReturn = 'List of all Recipes.';


        return {
            code: 200,
            message: messageToReturn,
            count: searchAllRecipes.count,
            results: {recipesData}
        };

    };

    public validationAddRecipe = async (recipe: CreateRecipeDto): Promise<CreateRecipeDto> => {

        const errors = await generalUtils.errorsFromValidate(recipe);

        if (errors !== undefined) throw new Error(JSON.stringify(errors));

        //recipe.productId = generalUtils.formattingWords(recipe.productId);

        if ((await this.searchRecipeByProductId(recipe.productId))) {
           
            return recipe;

        }else {

            throw new Error(JSON.stringify({ code: 404, message: 'Product do not exists!' }));
        }


    };

    

    public searchRecipeByProductId = async (productid: number) => {

        let recipe = await Product.findByPk(productid);

        if(recipe === null) throw new Error(JSON.stringify({ code: 404, message: 'ProductId is not exists!' }));

        return recipe;

    };

}

export default new RecipesServices();

import { ResponseDto } from "../common/dto/response.dto";
import generalUtils from "../common/utils/general.utils";
import { CreateIngredientDto } from "../dtos/create_ingredient.dto";
import { Ingredient } from "../models/ingredient.model";

class IngredientsService{

    getIngredients = async (role: string): Promise<ResponseDto> => {

        var ingredientsData, messageToReturn;
        const searchAllIngredients = await Ingredient.findAndCountAll();

        if(searchAllIngredients.count === 0) throw new Error(JSON.stringify({ code: 500, message: 'There are not ingredients added!'}))

        if(role === 'comprador'){

            messageToReturn = 'We have the following ingredients!';
            ingredientsData = searchAllIngredients.rows.map( i => i.dataValues.description ); 
            
        }else{

            messageToReturn = 'List of all ingredients.';
            ingredientsData = searchAllIngredients.rows; 
            
        }

        return {
            code: 200,
            message: messageToReturn,
            count: searchAllIngredients.count,
            results: ingredientsData
        };

    }; 

    public validationAddIngredient = async(ingredient: CreateIngredientDto): Promise<CreateIngredientDto> => {

        const errors = await generalUtils.errorsFromValidate(ingredient);

        if (errors !== undefined) throw new Error(JSON.stringify(errors));

        ingredient.name = generalUtils.formattingWords(ingredient.name);

        if ((await this.searchIngredientByName(ingredient.name))) throw new Error(JSON.stringify({ code: 404, message: 'Ingredient exists!' }));

        return ingredient;

    };

    public searchIngredientByName = async(name: string) => {

        name = generalUtils.formattingWords(name);

        const ingredient = await Ingredient.findOne({ where: { name: name } });

        if(ingredient !== null) throw new Error(JSON.stringify({ code: 400, message: 'Ingredient already exists!' }));

        return ingredient;

    };

    public searchIngredientsById = async(id: number) => {

        const ingredient = await Ingredient.findOne({ where: { id: id }});

        if(ingredient === null) throw new Error(JSON.stringify({ code: 404, message: 'Ingredient is not exists!' }));

        return ingredient;

    };

}

export default new IngredientsService();

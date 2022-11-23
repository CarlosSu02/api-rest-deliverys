
import { ResponseDto } from "../common/dto/response.dto";
import generalUtils from "../common/utils/general.utils";
import { CreateCategoryDto } from "../dtos/create_category.dto";
import { Category } from "../models/category.model";

class CategoriesServices {

    public getCategories = async (role: string): Promise<ResponseDto> => {

        var categoriesData, messageToReturn;
        const searchAllCategories = await Category.findAndCountAll();

        if (searchAllCategories.count === 0) throw new Error(JSON.stringify({ code: 500, message: 'There are not categories added!' }));

        if(role === 'comprador'){

            categoriesData = searchAllCategories.rows.map( c => c.dataValues.description ); 
            messageToReturn = 'We have the following categories!';
            
        }else{

            categoriesData = searchAllCategories.rows; 
            messageToReturn = 'List of all categories.';

        }

        return {
            code: 200,
            message: messageToReturn,
            count: searchAllCategories.count,
            results: {categoriesData}
        };

    };

    public validationAddCategory = async (category: CreateCategoryDto): Promise<CreateCategoryDto> => {

        const errors = await generalUtils.errorsFromValidate(category);

        if (errors !== undefined) throw new Error(JSON.stringify(errors));

        category.name = generalUtils.formattingWords(category.name);

        if ((await this.searchCategoryByName(category.name))) throw new Error(JSON.stringify({ code: 404, message: 'Category exists!' }));

        return category;

    };

    public searchCategoryByName = async (name: string) => {

        name = generalUtils.formattingWords(name);

        const category = await Category.findOne({ where: { name: name } });

        if (category !== null) throw new Error(JSON.stringify({ code: 400, message: 'Category already exists!' }));

        return category;

    };

    public searchCategoryById = async (id: number) => {

        let category = await Category.findByPk(id);

        if(category === null) throw new Error(JSON.stringify({ code: 404, message: 'Category is not exists!' }));

        return category;

    };

}

export default new CategoriesServices();

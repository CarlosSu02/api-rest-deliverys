import { ResponseDto } from "../common/dto/response.dto";
import generalUtils from "../common/utils/general.utils";
import { CreateProductDto } from "../dtos/create_product.dto";
import { Category } from "../models/category.model";
import { Product } from "../models/product.model";
import categoriesService from "./categories.service";

class ProductsService{

    public getProducts = async(): Promise<ResponseDto> => {

        const searchAllProducts = await Product.findAndCountAll({ include: [{ model: Category, attributes: ['description'] }], order: [['id', 'ASC']] });;

        if(searchAllProducts.count === 0) throw new Error(JSON.stringify({ code: 500, message: 'There are not products added!' }))

        return {
            code: 200,
            message: 'List of all products.',
            count: searchAllProducts.count,
            results: searchAllProducts.rows
        };

    }

    public validationAddCategory = async (product: CreateProductDto): Promise<CreateProductDto> => {

        const errors = await generalUtils.errorsFromValidate(product);

        if (errors !== undefined) throw new Error(JSON.stringify(errors));

        if ((await this.searchProductByDescription(product.description))) throw new Error(JSON.stringify({ code: 404, message: 'Product exists!' }));

        await categoriesService.searchCategoryById(product.categoryId);

        return product;

    };

    public searchProductByDescription = async(description: string) => {

        const product = await Product.findOne({ where: { description: description }});
        
        if(product !== null) throw new Error(JSON.stringify({ code: 400, message: 'Product already exists!' }));

        return product;

    }

    public searchProductById = async(id: number) => {

        const product = await Product.findByPk(id);

        if(product === null) throw new Error(JSON.stringify({ code: 400, message: 'Product is not exists!' }));

        return product;

    }

}

export default new ProductsService();
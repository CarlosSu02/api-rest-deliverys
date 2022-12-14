
import { ResponseDto } from "../common/dto/response.dto";
import generalUtils from "../common/utils/general.utils";
import { CreateProductDto } from "../dtos/create_product.dto";
import { Category } from "../models/category.model";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import categoriesService from "./categories.service";

interface IProducts {
    store: string,
    products: any[]
}

class ProductsService{

    public getProducts = async(): Promise<ResponseDto> => {

        const searchAllProducts = await Product.findAndCountAll({ include: [{ model: Category, attributes: ['name'] }], order: [['id', 'ASC']] });;

        if(searchAllProducts.count === 0) throw new Error(JSON.stringify({ code: 500, message: 'There are not products added!' }))

        return {
            code: 200,
            message: 'List of all products.',
            count: searchAllProducts.count,
            results: searchAllProducts.rows
        };

    }

    public validationAddProduct = async (product: CreateProductDto): Promise<CreateProductDto> => {

        const errors = await generalUtils.errorsFromValidate(product);

        if (errors !== undefined) throw new Error(JSON.stringify(errors));

        product.name = generalUtils.formattingWords(product.name);

        await categoriesService.searchCategoryById(product.categoryId);

        return product;

    };

    public searchProductByNameAndStore = async (name: string, store: string) => {

        name = generalUtils.formattingWords(name);
        store = generalUtils.formattingWords(store);

        const product = await Product.findOne({ where: { name }, include: [{ model: User, where: { name: store }, attributes: ['name', 'email', 'address']  }] }).then(info => info?.dataValues);

        return product;

    };

    public searchProductById = async (id: number) => {

        const product = await Product.findByPk(id);

        if(product === null) throw new Error(JSON.stringify({ code: 400, message: 'Product is not exists!' }));

        return product;

    };

    public searchProductBySeller = async (name: string, sellerId: number) => {

        const product = await Product.findOne({ where: { name, sellerId } });

        if(product !== null) throw new Error(JSON.stringify({ code: 400, message: 'Product already exists!' }));

        return product;

    };

    public searchAllStoresAndProducts = async () => {

        const products = await User.findAndCountAll({ attributes: ['name'], include: [{ model: Product, attributes: ['name', 'price', 'stock'] }] });

        if (products.count === 0) await this.getProducts();

        const storeProducts = products.rows.map(store => {

            if (store.dataValues.products.length !== 0) {

                let product: IProducts = {
                    store: store.dataValues.name,
                    products: []
                }

                store.dataValues.products.map((prod: any) => {

                   product.products.push(prod.dataValues);
                    
                });

                return product;
            }

        });

        return storeProducts.filter(data => data !== undefined);

    };

}

export default new ProductsService();

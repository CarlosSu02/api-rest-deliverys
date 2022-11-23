
// Bills service
import { ResponseDto } from "../common/dto/response.dto";
import generalUtils from "../common/utils/general.utils";
import { CreateBillDto } from "../dtos/create_bill.dto";
import { BillDetail } from "../models/bill.detail.model";
import { Bill } from "../models/bill.model";
import { ListProducts } from "../models/listProducts.model";
import { Product } from "../models/product.model";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";
import productsService from "./products.service";
import usersService from "./users.service";

interface IFinalSale {
    finalPrice: number,
    finalAmount: number,
    products: any[]
}

class BillsServices {

    public getAllBills = async (): Promise<ResponseDto> => {

        const searchAllBills = await Bill.findAndCountAll();

        if (searchAllBills.count === 0) throw new Error(JSON.stringify({ code: 500, message: 'There are not bills added!' }));

        return {
            code: 200,
            message: 'List of all bills.',
            count: searchAllBills.count,
            results: searchAllBills.rows 
        };

    };

    public getBillById = async (id: number) => {

        const bill = await Bill.findByPk(id);

        if (bill === null) throw new Error(JSON.stringify({ code: 404, message: 'Bill is not exists!' }));

        return bill;

    };

    public getBillsByEmailPurchase = async (email: string): Promise<ResponseDto> => {
        
        const user = await usersService.searchUserByEmail(email);
        const billsPurchase = await Bill.findAndCountAll({ where: { userId: user?.dataValues.id }, include: [{ model: BillDetail }], order: [['id', 'ASC']] });
               
        if (billsPurchase.count === 0) throw new Error(JSON.stringify({ code: 500, message: 'You have not made any purchase!' }));

        return {
            code: 200,
            message: 'These are your purchases.',
            count: billsPurchase.count,
            results: billsPurchase.rows
        };

    };

    public getBillsByEmailSeller = async (email: string): Promise<ResponseDto> => {

        const user = await usersService.searchUserByEmail(email);
        const bills = await Product.findAndCountAll({ where: { sellerId: user?.dataValues.id }, include: [{ model: ListProducts, include: [{ model: BillDetail }]  }, { model: User, attributes: ['name', 'email'] }], order: [['id', 'ASC']] });
        
        if (bills.count === 0) throw new Error(JSON.stringify({ code: 500, message: 'Has not made any sale!' }));

        return {
            code: 200,
            message: 'These are your sales.',
            count: bills.count,
            results: bills.rows
        };

    };

    public getRoleByName = async (type: string) => {

        const role = await Role.findOne({ where: { type: type } });

        if (role !== null) throw new Error(JSON.stringify({ code: 400, message: 'Role already exists!' }));

        return role;

    };

    public validationAddBill = async (bill: CreateBillDto): Promise<CreateBillDto> => {

        // role.type = (role.type).toLowerCase().trim();

        const errors = await generalUtils.errorsFromValidate(bill);

        if (errors !== undefined) throw new Error(JSON.stringify(errors));

        await usersService.searchUserById(bill.userId);

        return bill;

    };

    public validationProductsBill = async (products: any): Promise<IFinalSale> => {

        let finalSale: IFinalSale = {
            finalPrice: 0,
            finalAmount: 0,
            products: []
        };

        // let partialPrice = 0;

        // const products1 = products.products;

        for (const product of products.products) {

            const existsProduct = await productsService.searchProductByNameAndStore(product.product, product.store);

            // if (existsProduct === undefined)
            //     notExistsProducts.push(product);
            // else
            //     existsProducts.push(product);

            if (existsProduct === undefined) throw new Error(JSON.stringify({ code: 404, message: `The product '${product.product}' is not exists in the store '${product.store}'.` }));
            
            if (existsProduct.stock === 0) throw new Error(JSON.stringify({ code: 400, message: `Sorry, there are no units available of the product '${product.product}' from the store '${product.store}'.` }));
            
            if (existsProduct.stock < product.amount) throw new Error(JSON.stringify({code: 400, message: `'${product.store}' store does not have ${product.amount} the units you request, select a quantity less than or equal to ${existsProduct.stock} units.`}));
            
            // partialPrice += product.amount * existsProduct.price;
            product.id = existsProduct.id;

            // compra final
            finalSale.finalPrice += product.amount * existsProduct.price;
            if (product.amount !== 0 && product.amount > 0) finalSale.products.push(product);

            finalSale.finalAmount += product.amount;

        }

        // console.log(finalSale);

        return finalSale;

    };

}

export default new BillsServices();

/* 
const payload = req.body;

for (let i = 0; i < payload.products.length; i++) {
    const product = await productsService.getProductByDescriptionBillDetail(payload.products[i].product);
    console.log(product.dataValues.stock)

    //console.log(product)
    if(product.dataValues.size !== payload.products[i].tienda)throw new Error(JSON.stringify({code: 400, message: `The product ${product.dataValues.description} does not belong to ${payload.products[i].tienda} store`}))
    if(product.dataValues.stock <= payload.products[i].amount)throw new Error(JSON.stringify({code: 400, message: ` ${payload.products[i].tienda} store does not have ${product.dataValues.size} the units you request, select a quantity less than ${product.dataValues.stock+1} units`}))

    product.dataValues.stock-=payload.products[i].amount;
    
    console.log(product.dataValues.stock)
}
*/


// Roles service
import { ResponseDto } from "../common/dto/response.dto";
import generalUtils from "../common/utils/general.utils";
import { CreateBillDto } from "../dtos/create_bill.dto";
import { BillDetail } from "../models/bill.detail.model";
import { Bill } from "../models/bill.model";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";
import usersService from "./users.service";

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
            results: billsPurchase
        };

    };

    public getBillsByEmailSeller = async (email: string): Promise<ResponseDto> => {

        const billsPurchase = await Bill.findAndCountAll({ where: { sellerEmail: email }, include: [{ model: BillDetail }, { model: User, attributes: ['name', 'email'] }], order: [['id', 'ASC']] });
        
        if (billsPurchase.count === 0) throw new Error(JSON.stringify({ code: 500, message: 'Has not made any sale!' }));

        return {
            code: 200,
            message: 'These are your sales.',
            count: billsPurchase.count,
            results: billsPurchase.rows
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

}

export default new BillsServices();

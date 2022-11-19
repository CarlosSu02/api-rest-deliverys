
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { ResponseDto } from '../common/dto/response.dto';
import generalUtils from '../common/utils/general.utils';
import { CreateBillDto } from '../dtos/create_bill.dto';
import { CreateRoleDto } from '../dtos/create_role.dto';
import { Bill } from '../models/bill.model';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import billsService from '../services/bills.service';
import rolesService from '../services/roles.service';
import usersService from '../services/users.service';
import authController from './auth.controller';

class BillController {

    // Superadmin
    public getAllBills = async (req: Request, res: Response) => {

        try {

            if (authController.token.role !== 'superadmin') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to list the roles!'}));

            const bills = await billsService.getAllBills();

            res.status(bills.code!).send(bills);
            
        } catch (error) {

            if (error instanceof Error) {
                
                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);
            
            }
            
            return res.status(500).send(String(error));
            
        }

    };

    public getBills = async (req: Request, res: Response) => {

        try {

            // if (authController.token.role !== 'superadmin') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to list the roles!'}));

            const { email, role } = authController.token;

            if (role === 'comprador') {

                const billsPurchase = await billsService.getBillsByEmailPurchase(email);

                return res.status(billsPurchase.code!).send(billsPurchase);
            
            }

            const billsSeller = await billsService.getBillsByEmailSeller(email);

            res.status(billsSeller.code!).send(billsSeller);
            
        } catch (error) {

            if (error instanceof Error) {
                
                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);
            
            }
            
            return res.status(500).send(String(error));
            
        }

    };

    public createBill = async (req: Request, res: Response) => {

        try {

            // if (authController.token.role !== 'superadmin') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to list the roles!'}));

            const payload = req.body;

            // console.log(payload);
            // console.log(payload.products.length);

            // payload.products.forEach(async(pr: any, index: any) => {
                   
            //     // console.log(pr.tienda);
            //     console.log(await User.findOne({ where: { name: pr.tienda } }).then(data => data?.toJSON()));              
                
            // });

            // const product = await User.findOne({ where: { email: payload.product[0] } });
    
            const createBillDto = plainToClass(CreateBillDto, payload);
        
            createBillDto.userId = await usersService.searchUserByEmail(authController.token.email).then(data => data?.dataValues.id);
            createBillDto.date = new Date().toLocaleString();

            const validatedBill = await billsService.validationAddBill(createBillDto);

            const newBill= await Bill.create({
                ...validatedBill
            });

            const response: ResponseDto = {
                code: 201,
                message: 'New bill created successfully.',
                results: newBill
            }

            res.status(response.code!).send(response);

            res.sendStatus(204);
            
        } catch (error) {

            if (error instanceof Error) {
                                
                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);
            
            }
            
            return res.status(500).send(String(error));
            
        }

    };

}

export default new BillController();

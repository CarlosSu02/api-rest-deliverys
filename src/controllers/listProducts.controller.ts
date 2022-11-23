
import { Request, Response } from 'express';
import billsService from '../services/bills.service';
import authController from './auth.controller';

class ListProductsController {

    // Superadmin
    public getAllBills = async (req: Request, res: Response) => {

        try {

            if (authController.token.role !== 'Superadmin') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to list the bills!'}));

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

            // if (authController.token.role !== 'Superadmin') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to list the roles!'}));

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

}

export default new ListProductsController();


import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { ResponseDto } from '../common/dto/response.dto';
import { CreateBillDto } from '../dtos/create_bill.dto';
import { BillDetail, BillDetailAddModel } from '../models/bill.detail.model';
import { Bill } from '../models/bill.model';
import { ListProducts } from '../models/listProducts.model';
import billsService from '../services/bills.service';
import productsService from '../services/products.service';
import usersService from '../services/users.service';
import authController from './auth.controller';

class BillController {

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

            const { email, role } = authController.token;

            if (role === 'Buyer') {

                const billsPurchase = await billsService.getBillsByEmailPurchase(email);

                return res.status(billsPurchase.code!).send(billsPurchase);
            
            }
            
            if (role === 'Superadmin') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to list the bills!'}));

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

            if (authController.token.role !== 'Buyer') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to list the roles!'}));

            const payload = req.body;

            const createBillDto = plainToClass(CreateBillDto, payload);
        
            createBillDto.userId = await usersService.searchUserByEmail(authController.token.email).then(data => data?.dataValues.id);
            createBillDto.date = new Date().toLocaleString();

            const validatedBill = await billsService.validationAddBill(createBillDto);
            const finalSale = await billsService.validationProductsBill(payload);

            const newBill = await Bill.create({
                ...validatedBill
            });

            const response: ResponseDto = {
                code: 201,
                message: 'New bill created successfully.',
                results: newBill
            }       

            const createBillDetail: BillDetailAddModel = {
                totalAmount: finalSale.finalAmount,
                totalPrice: finalSale.finalPrice,
                billId: newBill.dataValues.id
            }

            const newBillDetail = await BillDetail.create({
                ...createBillDetail
            });

            // actualizacion de stock de productos, abajo de newBills para confirmacion de la compra
            finalSale.products.forEach(async (product) => {

                const updateProduct = await productsService.searchProductById(product.id);

                updateProduct.set({
                    stock: (updateProduct.dataValues.stock - product.amount)
                });
                await updateProduct.save();

                await ListProducts.create({
                    billDetailId: newBillDetail.dataValues.id,
                    productId: product.id,
                    amount: product.amount
                });

            });

            res.status(response.code!).send(response);

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

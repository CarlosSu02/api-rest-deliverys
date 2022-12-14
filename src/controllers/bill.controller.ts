
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

            if (authController.token.role !== 'Buyer') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to create bills!'}));

            const payload = req.body;

            const createBillDto = plainToClass(CreateBillDto, payload);
        
            createBillDto.userId = await usersService.searchUserByEmail(authController.token.email).then(data => data?.dataValues.id);
            createBillDto.date = new Date().toLocaleString();

            const validatedBill = await billsService.validationAddBill(createBillDto);
            const finalSale = await billsService.validationProductsBill(payload);

            const newBill = await Bill.create({
                ...validatedBill
            });      

            const createBillDetail: BillDetailAddModel = {
                totalAmount: finalSale.finalAmount,
                totalPrice: finalSale.finalPrice,
                billId: newBill.dataValues.id
            }

            const newBillDetail = await BillDetail.create({
                ...createBillDetail
            });

            let finallDiscount = 0;

            if(newBillDetail.dataValues.totalPrice >= 1600){
                finallDiscount = (newBillDetail.dataValues.totalPrice * 0.09);
            }else if(newBillDetail.dataValues.totalPrice >= 1300){
                finallDiscount = (newBillDetail.dataValues.totalPrice * 0.07);
            }else if(newBillDetail.dataValues.totalPrice >= 1000){
                finallDiscount = (newBillDetail.dataValues.totalPrice * 0.05);
            }else if(newBillDetail.dataValues.totalPrice >= 700){
                finallDiscount = (newBillDetail.dataValues.totalPrice * 0.03);
            }

            newBill.set({
                tax: (newBillDetail.dataValues.totalPrice * 0.15),
                discount: finallDiscount
            });
            await newBill.save();

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

            const billDetail = await Bill.findOne({ where: { id: newBill.dataValues.id }, include: [{ model: BillDetail, attributes: ['totalPrice', 'totalAmount'] }] });

            const response: ResponseDto = {
                code: 201,
                message: 'New bill created successfully.',
                results: billDetail!
            } 

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

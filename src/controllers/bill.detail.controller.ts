
import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { ResponseDto } from "../common/dto/response.dto";
import { CreateBillDetailDto } from "../dtos/create_bill.detail.dto";
import { BillDetail } from "../models/bill.detail.model";
import billDetailsService from "../services/bill.detail.service";
import authController from "./auth.controller";

class BillDetailController{

    public getBillDetails = async (req: Request, res: Response) => {

        try {

            const billDetails = await billDetailsService.getBillDetails();

            res.status(billDetails.code!).send(billDetails);
            
        } catch (error) {

            if (error instanceof Error) {
                
                const info = JSON.parse(error.message);
                return res.status(info.code).send(info);
            
            }
            
            return res.status(500).send(String(error));
            
        }

    };

    public createBillDetail = async (req: Request, res: Response) => {
        
        try {

            if (authController.token.role === 'Buyer') throw new Error(JSON.stringify({ code: 401, message: 'You do not have permission to create bill details!'}));

            const payload = req.body;
            const createBillDetailDto = plainToClass(CreateBillDetailDto, payload);
            const validatedBillDetail = await billDetailsService.validationAddBillDetail(createBillDetailDto);

            const newBillDetail = await BillDetail.create({
                ...validatedBillDetail
            });

            const response: ResponseDto = {
                code: 201,
                message: 'The new bill detail created successfully.',
                results: newBillDetail
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

export default new BillDetailController();
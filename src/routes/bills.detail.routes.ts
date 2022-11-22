import { Router } from "express";
import authController from "../controllers/auth.controller";
import billDetailController from "../controllers/bill.detail.controller";

class BillsDetailRoutes {

    router = Router();

    constructor() {

        this.initRoutes();

    };

    initRoutes = () => {

        this.router.get('/billsdetail', authController.verifyToken, billDetailController.getBillDetails);
        //this.router.get('/bills/user', authController.verifyToken, billController.getBills);
        this.router.post('/billsdetail', authController.verifyToken, billDetailController.createBillDetail);

    };

}

export default new BillsDetailRoutes();

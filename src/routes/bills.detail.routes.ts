import { Router } from "express";
import authController from "../controllers/auth.controller";
import billDetailController from "../controllers/bill.detail.controller";

class BillsDetailRoutes {

    router = Router();

    constructor() {

        this.initRoutes();

    };

    initRoutes = () => {

        this.router.get('/', authController.verifyToken, billDetailController.getBillDetails);
        this.router.post('/', authController.verifyToken, billDetailController.createBillDetail);

    };

}

export default new BillsDetailRoutes();

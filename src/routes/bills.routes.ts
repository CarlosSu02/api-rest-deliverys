
import { Router } from "express";
import authController from "../controllers/auth.controller";
import billController from "../controllers/bill.controller";
import roleController from "../controllers/role.controller";

class BillsRoutes {

    router = Router();

    constructor() {

        this.initRoutes();

    };

    initRoutes = () => {

        this.router.get('/bills', authController.verifyToken, billController.getAllBills);
        this.router.get('/bills/user', authController.verifyToken, billController.getBills);
        this.router.post('/bills', authController.verifyToken, billController.createBill);

    };

}

export default new BillsRoutes();

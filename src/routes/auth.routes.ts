
import { Router } from "express";
import authController from "../controllers/auth.controller";

class AuthRoutes {

    router =  Router();

    constructor() {

        this.initRoutes();
        
    }

    initRoutes = () => {

        this.router.get('/ping', authController.ping);

    };


}

export default new AuthRoutes();

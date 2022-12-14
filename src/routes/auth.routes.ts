
import { Router } from "express";
import authController from "../controllers/auth.controller";

class AuthRoutes {

    router =  Router();

    constructor() {

        this.initRoutes();
        
    };

    initRoutes = () => {

        this.router.get('/ping', authController.ping);
        this.router.post('/signup', authController.signup);
        this.router.post('/signin', authController.signin);
        this.router.patch('/change_password', authController.verifyToken, authController.changePassword);
        this.router.delete('/signout', authController.signout);

    };


}

export default new AuthRoutes();

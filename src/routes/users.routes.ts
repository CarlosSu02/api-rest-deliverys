
import { Router } from "express";
import authController from "../controllers/auth.controller";
import userController from "../controllers/user.controller";

class RolesRoutes {

    router = Router();

    constructor() {

        this.initRoutes();

    };

    initRoutes = () => {

        this.router.get('/users', authController.verifyToken, userController.getUsers);
        this.router.get('/profile', authController.verifyToken, userController.profile);
        this.router.patch('/update', authController.verifyToken, userController.updateUser);
        this.router.delete('/delete', authController.verifyToken, userController.deleteUser);

    };

}

export default new RolesRoutes();


import { Router } from "express";
import authController from "../controllers/auth.controller";
import roleController from "../controllers/role.controller";
import userController from "../controllers/user.controller";

class RolesRoutes {

    router = Router();

    constructor() {

        this.initRoutes();

    };

    initRoutes = () => {

        this.router.get('/profile', authController.verifyToken, userController.profile);
        this.router.patch('/update', authController.verifyToken, userController.updateUser);

    };

}

export default new RolesRoutes();


import { Router } from "express";
import authController from "../controllers/auth.controller";
import roleController from "../controllers/role.controller";

class RolesRoutes {

    router = Router();

    constructor() {

        this.initRoutes();

    };

    initRoutes = () => {

        this.router.get('/roles', authController.verifyToken, roleController.getRoles);
        this.router.post('/roles', authController.verifyToken, roleController.createRole);
        this.router.patch('/roles/:id', authController.verifyToken, roleController.updateRole);
        this.router.delete('/roles/:id', authController.verifyToken, roleController.deleteRole);

    };

}

export default new RolesRoutes();

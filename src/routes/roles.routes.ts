
import { Router } from "express";
import authController from "../controllers/auth.controller";
import roleController from "../controllers/role.controller";

class RolesRoutes {

    router = Router();

    constructor() {

        this.initRoutes();

    };

    initRoutes = () => {

        this.router.get('/', authController.verifyToken, roleController.getRoles);
        this.router.post('/', authController.verifyToken, roleController.createRole);
        this.router.patch('/:id', authController.verifyToken, roleController.updateRole);
        this.router.delete('/:id', authController.verifyToken, roleController.deleteRole);

    };

}

export default new RolesRoutes();

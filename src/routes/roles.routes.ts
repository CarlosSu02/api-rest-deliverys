
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
        
        // De momento sin verificar token.
        this.router.post('/roles', roleController.createRole);

    };

}

export default new RolesRoutes();

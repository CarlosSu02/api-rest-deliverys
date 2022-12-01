
import { Router } from "express";
import authController from "../controllers/auth.controller";
import productController from "../controllers/product.controller";

class ProductsRoutes{

    router = Router();

    constructor(){

        this.initRoutes();

    };

    initRoutes(){

        this.router.get('/', productController.getProducts);
        this.router.post('/', authController.verifyToken, productController.createProduct);
        this.router.post('/superadmin', authController.verifyToken, productController.createProductSuperadmin);
        this.router.patch('/:id', authController.verifyToken, productController.updateProduct);
        this.router.delete('/:id', authController.verifyToken, productController.deteleProduct);

    };

}

export default new ProductsRoutes();

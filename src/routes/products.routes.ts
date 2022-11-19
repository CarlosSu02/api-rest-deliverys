
import { Router } from "express";
import authController from "../controllers/auth.controller";
import productController from "../controllers/product.controller";

class ProductsRoutes{

    router = Router();

    constructor(){

        this.initRoutes();

    }

    initRoutes(){

        this.router.get('/products', productController.getProducts);
        this.router.post('/products', authController.verifyToken, productController.createProduct);
        this.router.patch('/products/:id', authController.verifyToken, productController.updateProduct);
        this.router.delete('/products/:id', authController.verifyToken, productController.deteleProduct);

    }

}

export default new ProductsRoutes();

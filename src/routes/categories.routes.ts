
import { Router } from "express";
import authController from "../controllers/auth.controller";
import categoriesController from "../controllers/category.controller";

class CategoriesRoutes {

    router = Router();

    constructor() {

        this.initRoutes();

    };

    initRoutes = () => {

        this.router.get('/categories', authController.verifyToken, categoriesController.getCategories);
        this.router.post('/categories', authController.verifyToken, categoriesController.createCategory);
        this.router.patch('/categories/:id', authController.verifyToken, categoriesController.updateCategory);
        this.router.delete('/categories/:id', authController.verifyToken, categoriesController.deleteCategory)

    };

}

export default new CategoriesRoutes();

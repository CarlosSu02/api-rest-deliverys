
import { Router } from "express";
import authController from "../controllers/auth.controller";
import categoriesController from "../controllers/category.controller";

class CategoriesRoutes {

    router = Router();

    constructor() {

        this.initRoutes();

    };

    initRoutes = () => {

        this.router.get('/', authController.verifyToken, categoriesController.getCategories);
        this.router.post('/', authController.verifyToken, categoriesController.createCategory);
        this.router.patch('/:id', authController.verifyToken, categoriesController.updateCategory);
        this.router.delete('/:id', authController.verifyToken, categoriesController.deleteCategory)

    };

}

export default new CategoriesRoutes();

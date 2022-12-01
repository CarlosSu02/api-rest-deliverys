
import { Router } from "express";
import authController from "../controllers/auth.controller";
import ingredientController from "../controllers/ingredient.controller";

class IngredientsRoutes{

    router = Router();

    constructor(){

        this.initRoutes();

    };

    initRoutes = () => {

        this.router.get('/', authController.verifyToken, ingredientController.getIngredients);
        this.router.post('/', authController.verifyToken, ingredientController.createIngredient);
        this.router.patch('/:id', authController.verifyToken, ingredientController.updateIngredient);
        this.router.delete('/:id', authController.verifyToken, ingredientController.deleteIngredient);

    };

}

export default new IngredientsRoutes();


import { Router } from "express";
import authController from "../controllers/auth.controller";
import ingredientController from "../controllers/ingredient.controller";

class IngredientsRoutes{

    router = Router();

    constructor(){

        this.initRoutes();

    };

    initRoutes = () => {

        this.router.get('/ingredients', authController.verifyToken, ingredientController.getIngredients);
        this.router.post('/ingredients', authController.verifyToken, ingredientController.createIngredient);
        this.router.patch('/ingredients/:id', authController.verifyToken, ingredientController.updateIngredient);
        this.router.delete('/ingredients/:id', authController.verifyToken, ingredientController.deleteIngredient);

    };

}

export default new IngredientsRoutes();


import { Router } from "express";
import authController from "../controllers/auth.controller";
import recipesController from "../controllers/recipe.controller";

class RecipesRoutes {

    router = Router();

    constructor() {

        this.initRoutes();

    };

    initRoutes = () => {

        this.router.get('/recipes', authController.verifyToken, recipesController.getRecipes);
        this.router.post('/recipes', authController.verifyToken, recipesController.createRecipe);
        this.router.delete('/recipes/:id', authController.verifyToken, recipesController.deleteRecipe)

    };

}

export default new RecipesRoutes();
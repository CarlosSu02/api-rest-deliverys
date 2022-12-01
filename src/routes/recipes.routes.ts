
import { Router } from "express";
import authController from "../controllers/auth.controller";
import recipesController from "../controllers/recipe.controller";

class RecipesRoutes {

    router = Router();

    constructor() {

        this.initRoutes();

    };

    initRoutes = () => {

        this.router.get('/', authController.verifyToken, recipesController.getRecipes);
        this.router.post('/', authController.verifyToken, recipesController.createRecipe);
        this.router.delete('/:id', authController.verifyToken, recipesController.deleteRecipe)

    };

}

export default new RecipesRoutes();
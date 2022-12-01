
import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import Connection from './database/connection';
import { Role } from './models/role.model';
import { User } from './models/user.model';
import { Bill } from './models/bill.model';
import { BillDetail } from './models/bill.detail.model';
import { Product } from './models/product.model';
import { Recipe } from './models/recipe.model';
import { Ingredient } from './models/ingredient.model';
import { Category } from './models/category.model';
import { ListProducts } from './models/listProducts.model';
import rolesRoutes from './routes/roles.routes';
import rolController from './controllers/role.controller';
import usersRoutes from './routes/users.routes';
import billsRoutes from './routes/bills.routes';
import categoriesRoutes from './routes/categories.routes';
import ingredientsRoutes from './routes/ingredients.routes';
import productsRoutes from './routes/products.routes';
import billsDetailRoutes from './routes/bills.detail.routes';
import recipesRoutes from './routes/recipes.routes'
import documentationController from './controllers/documentation.controller';
import categoryController from './controllers/category.controller';

class App {

    express: express.Application;
    connection: Connection | undefined;

    constructor() {
        
        this.express = express();
        this.middlewares();

        this.db();
        this.routes();

    };
    
    middlewares = () => {

        this.express.use(json());
        this.express.use(cors());
        this.express.use(cookieParser());

    };

    db = async () => {

        this.connection = new Connection();

        // modelos
        await Role.sync({ force: false });
        await User.sync({ force: false });
        await Bill.sync({ force: false });
        await Category.sync({ force: false });
        await Product.sync({ force: false });
        await Ingredient.sync({ force: false });
        await Recipe.sync({ force: false });
        await BillDetail.sync({ force: false });
        await ListProducts.sync({ force: false });

        await this.connection.connection.sync({ force: false })
            .then(() => {

                console.log(`Connection has been established successfully.`);

                rolController.insertRoles();
                categoryController.insertCategories();

            })
            .catch((error) => {

                console.log('Unable to connect to the database: ', error);

            });
            
    };

    routes = () => {

        this.express.use('/api/documentation', documentationController.documentation);
        this.express.use('/api/roles', rolesRoutes.router);
        this.express.use('/api/auth', authRoutes.router);
        this.express.use('/api/user', usersRoutes.router);
        this.express.use('/api/bills', billsRoutes.router);
        this.express.use('/api/categories', categoriesRoutes.router);
        this.express.use('/api/ingredients', ingredientsRoutes.router);
        this.express.use('/api/products', productsRoutes.router);
        this.express.use('/api/billdetails', billsDetailRoutes.router);
        this.express.use('/api/recipes', recipesRoutes.router);

    };

    listen = (PORT: number) => {

        this.express.listen(PORT, () => {

            console.log(`Server is running on port: ${PORT}, http://localhost:${PORT}/`);

        });

    };

}

export default new App();

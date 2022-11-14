
import express, { json } from 'express';
import cors from 'cors';
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

class App {

    express: express.Application;
    connection: Connection | undefined;

    constructor() {
        
        this.express = express();
        this.middlewares();

        this.db();
        this.routes();

    }
    
    middlewares = () => {

        this.express.use(json());
        this.express.use(cors());

    };

    db = async () => {

        this.connection = new Connection();

        await Role.sync({ force: false });
        await User.sync({ force: false });
        await Bill.sync({ force: false });
        await Category.sync({ force: false });
        await Product.sync({ force: false });
        await Ingredient.sync({ force: false });
        await Recipe.sync({ force: false });
        await BillDetail.sync({ force: false });



        await this.connection.connection.sync({ force: false })
            .then(() => {

                console.log(`Connection has been established successfully.`);

            })
            .catch((error) => {

                console.log('Unable to connect to the database: ', error);

            });

    };

    routes = () => {

        this.express.use('/api', authRoutes.router);

    };

    listen = (PORT: number) => {

        this.express.listen(PORT, () => {

            console.log(`Server is running on port: ${PORT}, http://localhost:${PORT}/`);

        });

    };

}

export default new App();

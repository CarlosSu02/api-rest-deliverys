
import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';

class Connection {

    public connection: Sequelize;
    
    constructor() {

        this.connection = new Sequelize({
            database: process.env.PG_DATABASE,
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            host: process.env.PG_HOST,
            dialect: 'postgres',
            logging: false
        });
        
    }

}

export default Connection;

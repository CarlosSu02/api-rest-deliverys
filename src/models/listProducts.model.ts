
// listProducts model

import * as Sequelize from "sequelize-typescript"
import Connection from "../database/connection"

const connection = new Connection();

export interface ListProductsAddModel {
    billDetailId: number,
    productId: number
}

export interface ListProductsModel extends Sequelize.Model<ListProductsModel, ListProductsAddModel> {
    billDetailId: number,
    productId: number
}

export const ListProducts = connection.connection.define(
    'listProducts', 
    {
        billDetailId: {
            type: Sequelize.DataType.INTEGER,
            primaryKey: true,
            allowNull : false
            
        },
        productId: {
            type: Sequelize.DataType.INTEGER,
            primaryKey: true,
            allowNull : false  
        }
    },
    {
        timestamps: false
    }
);




// recipe model

import * as Sequelize from "sequelize-typescript"
import Connection from "../database/connection"



const connection = new Connection();

export interface RecipeAddModel {
    ingredientId: number,
    productId: number
}

export interface RecipeModel extends Sequelize.Model<RecipeModel, RecipeAddModel> {
    ingredientId: number,
    productId: number
}

export const Recipe = connection.connection.define(
    'recipes', 
    {
        ingredientId: {
            type: Sequelize.DataType.INTEGER,
            allowNull : false
            
        },
        productId: {
            type: Sequelize.DataType.INTEGER,
            allowNull : false  
        }
    },
    {
        timestamps: false
    }
);



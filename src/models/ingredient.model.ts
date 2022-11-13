
// Ingredient model

import * as Sequelize from "sequelize-typescript"
import Connection from "../database/connection"
import { Recipe } from "./recipe.model";

const connection = new Connection();

export interface IngredientAddModel {
    id: number,
    description: string,
    amount: number,
    unit_measure: string,
    cost: number,
    stock: number
    
}

export interface IngredientModel extends Sequelize.Model<IngredientModel, IngredientAddModel> {
    id: number,
    description: string,
    amount: number,
    unit_measure: string,
    cost: number,
    stock: number
}

export const Ingredient = connection.connection.define(
    'ingredients', 
    {
        id: {
            type: Sequelize.DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: Sequelize.DataType.STRING(100),
            allowNull: true
        },
        amount: {
            type: Sequelize.DataType.INTEGER,
            allowNull: false
        },
        unit_measure: {
            type: Sequelize.DataType.STRING(30),
            allowNull: false
        },
        cost: {
            type: Sequelize.DataType.INTEGER,
            allowNull: false
        },
        stock: {
            type: Sequelize.DataType.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

Ingredient.hasMany(Recipe, {
    foreignKey: 'ingredientId',
    sourceKey: 'id'
});

Recipe.belongsTo(Ingredient, {
    foreignKey: 'ingredientId',
    targetKey: 'id'
});



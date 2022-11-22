
// Category (Rubro) model

import * as Sequelize from "sequelize-typescript"
import Connection from "../database/connection"
import { Product } from "./product.model";


const connection = new Connection();

export interface CategoryAddModel {
    id: number,
    description: string
}

export interface CategoryModel extends Sequelize.Model<CategoryModel, CategoryAddModel> {
    id: number,
    description: string
}

export const Category = connection.connection.define(
    'categories', 
    {
        id: {
            type: Sequelize.DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.DataType.STRING(200),
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

Category.hasMany(Product, {
    foreignKey: 'categoryId',
    sourceKey: 'id'
});

Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    targetKey: 'id'
});

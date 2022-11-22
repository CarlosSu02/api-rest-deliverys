import * as Sequelize from "sequelize-typescript";
import Connection from "../database/connection";
import { BillDetail } from "./bill.detail.model";
import { ListProducts } from "./listProducts.model";
import { Recipe } from "./recipe.model";

const connection = new Connection();

export interface ProductAddModel {
    id: number,
    description: string,
    price: number,
    priceNotTax: number,
    categoryId: number,
    isElaborated: boolean,
    stock: number,
    size: string
}

export interface ProductModel extends Sequelize.Model<ProductModel, ProductAddModel> {
    id: number,
    description: string,
    price: number,
    priceNotTax: number,
    categoryId: number,
    isElaborated: boolean,
    stock: number,
    size: string
}

export const Product = connection.connection.define(
    'products',
    {
        id: {
            type: Sequelize.DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.DataType.STRING(100),
            allowNull: false
        },
        description: {
            type: Sequelize.DataType.STRING(300),
            allowNull: false
        },
        price: {
            type: Sequelize.DataType.INTEGER,
            allowNull: false
        },
        priceNotTax: {
            type: Sequelize.DataType.INTEGER,
            allowNull: false
        },
        isElaborate: {
            type: Sequelize.DataType.BOOLEAN,
            allowNull: false
        },
        stock: {
            type: Sequelize.DataType.INTEGER,
            allowNull: false
        },
        size: {
            type: Sequelize.DataType.STRING(30),
            allowNull: false
        }
    },
    {
        timestamps: false
    }
); 

Product.hasMany(Recipe, {
    foreignKey: 'productId',
    sourceKey: 'id'
});
 
Recipe.belongsTo(Product, {
    foreignKey: 'productId',
    targetKey: 'id'
});

Product.hasMany(ListProducts, {
    foreignKey: 'productId',
    sourceKey: 'id'
});
 
ListProducts.belongsTo(Product, {
    foreignKey: 'productId',
    targetKey: 'id'
});

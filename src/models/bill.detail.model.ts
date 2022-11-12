import * as Sequelize from "sequelize-typescript";
import Connection from "../database/connection";

const connection = new Connection();

export interface BillDetailAddModel {
    id: number, 
    productId: string, 
    amount: number, 
    price: number
}
  
export interface BillDetailModel extends Sequelize.Model <BillDetailModel, BillDetailAddModel> {
    id: number, 
    productId: number, 
    amount: number, 
    price: number
}
  
export const BillDetail = connection.connection.define(
    'billsDetails',
    {
        id: {
            type: Sequelize.DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productId: {
            type: Sequelize.DataType.INTEGER,
            allowNull: false
        },
        amount: {
            type: Sequelize.DataType.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.DataType.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

import * as Sequelize from "sequelize-typescript";
import Connection from "../database/connection";
import { ListProducts } from "./listProducts.model";

const connection = new Connection();

export interface BillDetailAddModel {
    id?: number, 
    totalAmount: number, 
    totalPrice: number
    billId: number
}
  
export interface BillDetailModel extends Sequelize.Model <BillDetailModel, BillDetailAddModel> {
    id: number, 
    totalAmount: number, 
    totalPrice: number,
    billId: number
}
  
export const BillDetail = connection.connection.define(
    'billsDetails',
    {
        id: {
            type: Sequelize.DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        totalAmount: {
            type: Sequelize.DataType.INTEGER,
            allowNull: false
        },
        totalPrice: {
            type: Sequelize.DataType.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

BillDetail.hasMany(ListProducts, {
    foreignKey: 'billDetailId',
    sourceKey: 'id'
});

ListProducts.belongsTo(BillDetail, {
    foreignKey: 'billDetailId',
    targetKey: 'id'
});



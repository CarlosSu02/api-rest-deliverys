
// Bill model

import * as Sequelize from "sequelize-typescript"
import Connection from "../database/connection"
import { BillDetail } from "./bill.detail.model";

const connection = new Connection();

export interface BillAddModel {
    id: number,
    detailBillId: number,
    date: string,
    userId: number,
    tax: number,
    discount: number,
    paymentForm: string,
    isPurchase: boolean
}

export interface BillModel extends Sequelize.Model<BillModel, BillAddModel> {
    id: number,
    detailBillId: number,
    date: string,
    userId: number,
    tax: number,
    discount: number,
    paymentForm: string,
    isPurchase: boolean
}

export const Bill = connection.connection.define(
    'bills', 
    {
        id: {
            type: Sequelize.DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: Sequelize.DataType.DATE,
            allowNull: false
        },
        tax: {
            type: Sequelize.DataType.INTEGER,
            allowNull: false
        },
        discount: {
            type: Sequelize.DataType.INTEGER,
            allowNull: false
        },
        paymentForm: {
            type: Sequelize.DataType.STRING(100),
            allowNull: false
        },
        isPurchase: {
            type: Sequelize.DataType.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

Bill.hasMany(BillDetail, {
    foreignKey: 'billId',
    sourceKey: 'id'
});

BillDetail.belongsTo(Bill, {
    foreignKey: 'billId',
    targetKey: 'id'
});


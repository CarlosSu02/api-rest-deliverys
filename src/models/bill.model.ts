
// Bill model

import * as Sequelize from "sequelize-typescript"
import Connection from "../database/connection "
import { User } from "./user.model";

const connection = new Connection();

export interface BillAddModel {
    id: number,
    detailBillId: number,
    date: string,
    userId: number,
    IVA: number,
    discount: number,
    paymentForm: string,
    isPurchase: boolean
}

export interface BillModel extends Sequelize.Model<BillModel, BillAddModel> {
    id: number,
    detailBillId: number,
    date: string,
    userId: number,
    IVA: number,
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
        IVA: {
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


// User model

import * as Sequelize from "sequelize-typescript"
import Connection from "../database/connection "
import { Bill } from "./bill.model";
import { Rol } from "./rol.model";

const connection = new Connection();

export interface UserAddModel {
    id: number,
    name: string,
    phone: number,
    address: string,
    email: string,
    password: string,
    rolId: number
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
    id: number,
    name: string,
    phone: number,
    address: string,
    email: string,
    password: string,
    rolId: number
}

export const User = connection.connection.define(
    'users', 
    {
        id: {
            type: Sequelize.DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.DataType.STRING(50),
            allowNull: false
        },
        phone: {
            type: Sequelize.DataType.INTEGER,
            allowNull: false
        },
        address: {
            type: Sequelize.DataType.STRING(100),
            allowNull: false
        },
        email: {
            type: Sequelize.DataType.STRING(100),
            allowNull: false
        },
        password: {
            type: Sequelize.DataType.STRING(100),
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

User.hasMany(Bill, {
    foreignKey: 'userId',
    sourceKey: 'id'
});

Bill.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id'
});

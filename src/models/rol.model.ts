
// Rol model

import * as Sequelize from "sequelize-typescript"
import Connection from "../database/connection"
import { User } from "./user.model";

const connection = new Connection();

export interface RolAddModel {
    id: number,
    type: string
}

export interface RolModel extends Sequelize.Model<RolModel, RolAddModel> {
    id: number,
    type: string
}

export const Rol = connection.connection.define(
    'roles', 
    {
        id: {
            type: Sequelize.DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: Sequelize.DataType.STRING(50),
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

Rol.hasMany(User, {
    foreignKey: 'rolId',
    sourceKey: 'id'
});

User.belongsTo(Rol, {
    foreignKey: 'rolId',
    targetKey: 'id'
});


// Rol model

import * as Sequelize from "sequelize-typescript"
import Connection from "../database/connection"
import { User } from "./user.model";

const connection = new Connection();

export interface RoleAddModel {
    id: number,
    type: string
}

export interface RoleModel extends Sequelize.Model<RoleModel, RoleAddModel> {
    id: number,
    type: string
}

export const Role = connection.connection.define(
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

Role.hasMany(User, {
    foreignKey: 'roleId',
    sourceKey: 'id'
});

User.belongsTo(Role, {
    foreignKey: 'roleId',
    targetKey: 'id'
});

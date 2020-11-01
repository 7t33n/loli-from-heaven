import { DataTypes, Model } from "sequelize";
import {database} from "../config/database";
import {Kind} from "./kind.model";

export class Fur extends Model {
    public id!: number;
    public value!: string;
}

export interface FurInterface {
    value: string;
    KindId: number;
}

Fur.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        value: {
            type: new DataTypes.STRING(128),
            unique: true,
            allowNull: false,
        },
    },
    {
        tableName: 'furs',
        sequelize: database,
    }
);

Fur.sync()
    .then(() => console.log('Fur table was created!'));

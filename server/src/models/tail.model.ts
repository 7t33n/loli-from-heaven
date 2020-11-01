import { DataTypes, Model } from "sequelize";
import {database} from "../config/database";

export class Tail extends Model {
    public id!: number;
    public value!: string;
}

export interface TailInterface {
    value: string;
}

Tail.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        value: {
            type: new DataTypes.STRING(128),
            unique: true,
        },
    },
    {
        tableName: 'tails',
        sequelize: database,
    }
);

Tail.sync()
    .then(() => console.log('Tail table was created!'));

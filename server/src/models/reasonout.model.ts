import { DataTypes, Model } from "sequelize";
import {database} from "../config/database";

export class Reasonout extends Model {
    public id!: number;
    public value!: string;
}

export interface ReasonoutInterface {
    value: string;
}

Reasonout.init(
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
        tableName: 'reasonouts',
        sequelize: database,
    }
);

Reasonout.sync()
    .then(() => console.log('Reasonout table was created!'));

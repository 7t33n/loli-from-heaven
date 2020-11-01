import { DataTypes, Model } from "sequelize";
import {database} from "../config/database";

export class Reasoneuth extends Model {
    public id!: number;
    public value!: string;
}

export interface ReasoneuthInterface {
    value: string;
}

Reasoneuth.init(
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
        tableName: 'reasoneuths',
        sequelize: database,
    }
);

Reasoneuth.sync()
    .then(() => console.log('Reasoneuth table was created!'));

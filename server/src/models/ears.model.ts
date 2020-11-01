import { DataTypes, Model } from "sequelize";
import {database} from "../config/database";

export class Ears extends Model {
    public id!: number;
    public value!: string;
}

export interface EarsInterface {
    value: string;
}

Ears.init(
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
        tableName: 'ears',
        sequelize: database,
    }
);

Ears.sync()
    .then(() => console.log('Ears table was created!'));

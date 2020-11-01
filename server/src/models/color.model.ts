import { DataTypes, Model } from "sequelize";
import {database} from "../config/database";

export class Color extends Model {
    public id!: number;
    public value!: string;
}

export interface ColorInterface {
    value: string;
}

Color.init(
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
        tableName: 'colors',
        sequelize: database,
    }
);

Color.sync()
    .then(() => console.log('Color table was created!'));

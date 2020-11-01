import { DataTypes, Model } from "sequelize";
import {database} from "../config/database";
import {Animal} from "./animal.model";
import {Size} from "./size.model";

export class Kind extends Model {
    public id!: number;
    public value!: string;
}

export interface KindInterface {
    value: string;
}

Kind.init(
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
        tableName: 'kinds',
        sequelize: database,
    }
);

Kind.sync()
    .then(() => console.log('Kind table was created!'));

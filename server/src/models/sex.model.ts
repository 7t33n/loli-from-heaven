import { DataTypes, Model } from "sequelize";
import {database} from "../config/database";

export class Sex extends Model {
    public id!: number;
    public value!: string;
}

export interface SexInterface {
    value: string;
}

Sex.init(
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
        tableName: 'sexes',
        sequelize: database,
    }
);

Sex.sync()
    .then(() => console.log('Sex table was created!'));

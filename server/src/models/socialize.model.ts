import { DataTypes, Model } from "sequelize";
import {database} from "../config/database";

export class Socialize extends Model {
    public id!: number;
    public value!: string;
}

export interface SocializeInterface {
    value: string;
}

Socialize.init(
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
        tableName: 'socializes',
        sequelize: database,
    }
);

Socialize.sync()
    .then(() => console.log('Socialize table was created!'));

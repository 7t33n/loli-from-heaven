import { DataTypes, Model } from "sequelize";
import {database} from "../config/database";

export class deathReason extends Model {
    public id!: number;
    public value!: string;
}

export interface deathReasonInterface {
    value: string;
}

deathReason.init(
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
        tableName: 'deathreasons',
        sequelize: database,
    }
);

deathReason.sync()
    .then(() => console.log('deathReason table was created!'));

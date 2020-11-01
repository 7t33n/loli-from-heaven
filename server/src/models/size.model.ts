import { DataTypes, Model } from "sequelize";
import {database} from "../config/database";

export class Size extends Model {
    public id!: number;
    public value!: string;
}

export interface SizeInterface {
    value: string;
}

Size.init(
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
        tableName: 'sizes',
        sequelize: database,
    }
);

Size.sync()
    .then(() => console.log('Size table was created!'));

import { DataTypes, Model } from "sequelize";
import {database} from "../config/database";

export class Breed extends Model {
    public id!: number;
    public value!: string;
}

export interface BreedInterface {
    value: string;
}

Breed.init(
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
        tableName: 'breeds',
        sequelize: database,
    }
);

Breed.sync()
    .then(() => console.log('Breed table was created!'));

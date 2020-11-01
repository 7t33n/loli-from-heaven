import { DataTypes, Model } from "sequelize";
import {database} from "../config/database";
import {Kind} from "./kind.model";
import {Fur} from "./fur.model";
import {Size} from "./size.model";
import {Breed} from "./breed.model";
import {Sex} from "./sex.model";
import {Tail} from "./tail.model";
import {Color} from "./color.model";
import {Ears} from "./ears.model";
import {deathReason} from "./deathreason.model";
import {Reasonout} from "./reasonout.model";
import {Reasoneuth} from "./reasoneuth.model";
import {Shelter} from "./shelter.modal";

export class Animal extends Model {
    public id!: number;
    public value!: string;
}

export interface AnimalInterface {
    SizeId: number;
    KindId: number;
    BreedId: number;
    SexId: number;
    FurId: number;
    TailId: number;
    ColorId: number;
    EarsId: number;
    deathReasonId: number;
    ReasonoutId: number;
    ReasoneuthId: number;
    ShelterId: number;
    SocializeId: number;
    name: string;
    record: number;
    markerId: number;
    dateIn: any;
    age: number;
    signs: string;
    dateSterilization: any;
    dateOut: any;
    weight: string;
    doctor: string;
    vaccination: string;
}

Animal.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        SizeId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        KindId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        BreedId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        SexId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        FurId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        TailId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        ColorId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        EarsId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        deathReasonId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        ReasonoutId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        ReasoneuthId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        ShelterId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        SocializeId: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        record: {
            type: DataTypes.STRING,
        },
        markerId: {
            type: DataTypes.STRING,
        },
        dateIn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        signs: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateSterilization: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateOut: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        doctor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vaccination: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: 'animals',
        sequelize: database,
    }
);

Size.hasMany(Animal);
Kind.hasMany(Animal);
Breed.hasMany(Animal);
Sex.hasMany(Animal);
Fur.hasMany(Animal);
Tail.hasMany(Animal);
Color.hasMany(Animal);
Ears.hasMany(Animal);
deathReason.hasMany(Animal);
Reasonout.hasMany(Animal);
Reasoneuth.hasMany(Animal);

Animal.sync({ force: true })
    .then(() => console.log('Animal table was created!'));

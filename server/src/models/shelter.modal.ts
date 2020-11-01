import axios from 'axios';
import { DataTypes, Model } from "sequelize";
import {database} from "../config/database";
require('dotenv').config();

export class Shelter extends Model {
    public id!: number;
    public value!: string;
}

export interface ShelterInterface {
    district?: string;
    admArea?: string;
    departmentalAffiliation?: string;
    address?: string;
    phone?: any;
    name?: string;
    coordinates: any;
    WorkingHours: any;
}

Shelter.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        district: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        admArea: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        departmentalAffiliation: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        phone: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        coordinates: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        WorkingHours: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    },
    {
        tableName: 'shelters',
        sequelize: database,
    }
);

Shelter.sync({ force: true })
    .then(() => console.log('Shelter table was created!'));

axios.get(`https://apidata.mos.ru/v1/datasets/744/rows?api_key=${process.env.MOS_RU_API_KEY}`)
    .then(async (response) => {
        const result = response.data
            .map((item) => ({
                ...item.Cells,
            }))
            .map((item) => ({
                district: item.District,
                admArea: item.AdmArea,
                departmentalAffiliation: item.DepartmentalAffiliation,
                address: item.Address,
                phone: item.Phone,
                name: item.Name,
                coordinates: item.geoData.coordinates,
                WorkingHours: item.WorkingHours,
            }));
        await Shelter.bulkCreate<Shelter>(result);
    });

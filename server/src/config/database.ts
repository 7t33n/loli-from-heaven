import {Sequelize} from "sequelize";
require('dotenv').config();
export const database = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_URL,
    database: 'hackathon',
    dialect: 'mariadb',
});

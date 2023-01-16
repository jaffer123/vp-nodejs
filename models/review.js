const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.define('json_data',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: Sequelize.STRING,
    },
    picture:{
        type: Sequelize.STRING,
    },
    rating:{
        type: Sequelize.INTEGER,
    },
    reviews:{
        type: Sequelize.INTEGER,
    },
    comments:{
        type: Sequelize.STRING,
    },
    createdAt:{
        type: Sequelize.DATE,
    },
    updatedAt:{
        type: Sequelize.DATE,
    },
});
const Sequelize = require('sequelize');
const {MYSQL} = require("./vaya.json");

const db = new Sequelize(MYSQL.DataBase,MYSQL.UserName,MYSQL.PassWord,{
    host:'localhost',
    dialect:'mysql',
    define:{
        "freezeTableName": true,
        "timestamps": true,
    },
    
})

module.exports = db;
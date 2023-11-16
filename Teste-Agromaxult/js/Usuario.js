const sequelize = require("sequelize");
const banco = require("./banco")

var Usuario = banco.conexao.define(
    "usuario",
    {
        id:{
            type:sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement:true
        },
        email:{
            type:sequelize.STRING,
            allowNull:false
        },
        hash:{
            type:sequelize.STRING,
            allowNull:false
        }
    }
)

module.exports = {Usuario: Usuario}
'use strict';

const { QueryInterface } = require("sequelize/types");
const { Sequelize, sequelize } = require("../models");

module.exports = {
    up: (QueryInterface, Sequelize)=>{
        return QueryInterface.createTable('Leads',{
            id:{
                allowNull: false,
                primaryKey: true,
                type:Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            creatAt:{
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt:{
                allowNull: false,
                type: Sequelize.DATE
            },
            email:{
                allowNull: false,
                type: Sequelize.STRING
            },
        });
    },
    down: (queryInterface, Sequelize) =>{
        return queryInterface.dropTable('Leads');
    }
}

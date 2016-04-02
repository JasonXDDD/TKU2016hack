/// <reference path="../../../../typings/node/node.d.ts" />
/// <reference path="../../../../typings/sequelize/sequelize.d.ts" />

var Sequelize = require('sequelize');

/*
    VARCHAR tablename
    VARCHAR subject
    INTEGER weekday
    VARCHAR classroom
    VARCHAR teacher
    DATETIME start_time
    DATETIME end_time
    User creator
    VARCHAR description
    INTEGER id // PK
*/

module.exports = function(sequelize){
    if(sequelize) {
        var Restaurant = sequelize.define('restaurant', {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address: {
                type: Sequelize.STRING,
            },
            lat: {
                type: Sequelize.FLOAT
            },
            lng: {
                type: Sequelize.FLOAT
            },
            area: {
                type: Sequelize.STRING  
            },
            suiteTime: {
                type: Sequelize.STRING
            },
            avarage_cost: {
                type: Sequelize.FLOAT
            },
            mealType: {
                type: Sequelize.STRING
            },
            restaurant_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            }
        },
        {
            paranoid: true
        });   
    }
    return Restaurant;
}
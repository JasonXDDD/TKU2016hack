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
        var EatLog = sequelize.define('eat_log', {
            content: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cost: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false
            },
        },
        {
            paranoid: true
        });   
    }
    return EatLog;
}
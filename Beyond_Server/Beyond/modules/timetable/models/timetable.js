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
        var Timetable = sequelize.define('Timetable', {
            tablename: {
                type: Sequelize.STRING,
                allowNull: false
            },
            subject: {
                type: Sequelize.STRING,
                allowNull: false
            },
            weekday: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            classroom: {
                type: Sequelize.STRING
            },
            teacher: {
                type: Sequelize.STRING
            },
            start_time: {
                type: Sequelize.DATE,
                allowNull: false
            },
            end_time: {
                type: Sequelize.DATE,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING
            }
        },
        {
            paranoid: true
        });   
    }
    return Timetable;
}
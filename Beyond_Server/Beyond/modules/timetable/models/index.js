var sequelize = app.db;
var User = require('../../user/models').User;

var Timetable = require('./timetable')(sequelize);

Timetable.belongsTo(User, {as: 'creator'});
User.hasMany(Timetable);

module.exports = {
    Timetable: Timetable
}
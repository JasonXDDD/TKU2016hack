var sequelize = app.db;
var User = require('../../user/models').User;

var Homework = require('./homework')(sequelize);

Homework.belongsTo(User, {as: 'creator'});
User.hasMany(Homework);

module.exports = {
    Homework: Homework
}
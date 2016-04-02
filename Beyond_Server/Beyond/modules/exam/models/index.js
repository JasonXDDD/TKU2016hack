var sequelize = app.db;
var User = require('../../user/models').User;

var Exam = require('./exam')(sequelize);

Exam.belongsTo(User, {as: 'creator'});
User.hasMany(Exam);

module.exports = {
    Exam: Exam
}
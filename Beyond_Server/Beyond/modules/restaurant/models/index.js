var sequelize = app.db;
var User = require('../../user/models').User;

var EatLog = require('./eat_log')(sequelize);
var Restaurant = require('./restaurant')(sequelize);

Restaurant.belongsTo(User, {as: 'creator'});
User.hasMany(Restaurant);

EatLog.belongsTo(Restaurant);
Restaurant.hasMany(EatLog, {as: 'eatLog'});

EatLog.belongsTo(User, {as: 'creator'});
User.hasMany(EatLog, {as: 'eatLog'});

module.exports = {
    Restaurant: Restaurant,
    EatLog: EatLog
}
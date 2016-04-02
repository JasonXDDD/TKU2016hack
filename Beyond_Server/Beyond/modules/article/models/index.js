var sequelize = app.db;
var User = require('../../user/models').User;

var Article = require('./article')(sequelize);

Article.belongsTo(User, {as: 'creator'});
User.hasMany(Article);

module.exports = {
    Article: Article
}
var sequelize = app.db;

module.exports = {
    User: require('./user')(sequelize)
}
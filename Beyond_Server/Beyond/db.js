var Sequelize = require('sequelize');
var config = require('./config');
var sequelize = new Sequelize(config.database.sql.dbname, config.database.sql.username, config.database.sql.password, {
  host: config.database.sql.host,
  dialect: config.database.sql.type,
  port: config.database.sql.port,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
if(config.database.nosql.connectionUri)
    mongoose.connect(config.database.nosql.connectionUri);
else{
    mongoose.connect('mongodb://'+config.database.nosql.host+':'+config.database.nosql.port+'/'+config.database.nosql.dbname,
    {user: config.database.nosql.username, pass: config.database.nosql.password});
}

module.exports = sequelize;
module.exports.sql = sequelize;
module.exports.nosql = mongoose;
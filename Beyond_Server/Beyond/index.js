/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/express-session/express-session.d.ts" />
/// <reference path="../typings/passport/passport.d.ts" />

var Express = require('express');
var path = require('path');
var config = require('./config');
var mainRouter = Express.Router();
var db = require('./db');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('passport');
module.exports.router = mainRouter;

config.session.store = new RedisStore(config.sessionStore); 
mainRouter.use(session(config.session));
mainRouter.use(passport.initialize());
mainRouter.use(passport.session());

// Global variable 'app' should be avaliable now, if index.js in the root folder has been executed.
// So we can put something often used in it.
var active_modules = {};
app.active_modules = active_modules; 
app.db = db;
app.config = config;
app.set('views', config.renderPagePath);

var modules = Object.keys(config.active_modules);
for (var m in modules){
    var mod = require(path.join(__dirname, 'modules', modules[m]));
    mod.init();
    mainRouter.use(config.active_modules[modules[m]].route, mod.router);
    mod.mountedPath = config.active_modules[modules[m]].route;
    active_modules[modules[m]] = mod;
    console.log("Loaded module " + modules[m] + ", mounted at " + config.active_modules[modules[m]].route);
}

// db.query('SET FOREIGN_KEY_CHECKS = 0')
// .then(function(){
//     return db.sync({ force: true, logging: console.log });
// })
// .then(function(){
//     return db.query('SET FOREIGN_KEY_CHECKS = 1')
// })

db.query("SET GLOBAL time_zone = '+8:00';");
db.sync({force: false}); // Sync database schema after loaded all the modules.
/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/body-parser/body-parser.d.ts" />
/// <reference path="typings/sequelize/sequelize.d.ts" />
/// <reference path="typings/morgan/morgan.d.ts" />

var Express = require('express');
var _app = Express();
global.app = _app; // Push _app to global scope.

var c_far = require('./Beyond');
var config = require('./config');
var logger = require('morgan');
var helmet = require('helmet');
var ejs = require('ejs');

_app.engine('.html', require('ejs').__express);
_app.set('view engine', 'html');
_app.set('trust proxy', config.trust_proxy);
_app.use(logger(config.logType));

// Use helmet to prevent some common attack.
_app.use(helmet.xssFilter());
_app.use(helmet.frameguard('sameorigin'));
_app.use(helmet.hidePoweredBy());
_app.use(helmet.ieNoOpen());
_app.use(helmet.noSniff());

_app.use('/', c_far.router);


_app.listen(config.listen.port, function(){
    console.log("Server started at port " + config.listen.port);
});
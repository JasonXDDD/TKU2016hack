var Model = require('./models');
var Express = require('express');
var router = require('./route');
var action = require('./action');
var inited = false;

var init = function(){
    require('./passport');
    inited = true;
}

module.exports.init = init;
module.exports.router = router;
module.exports.needLogin = router.needLogin;
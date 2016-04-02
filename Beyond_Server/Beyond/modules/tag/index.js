var Model = require('./models');
var Express = require('express');
var router = require('./route');
var action = require('./action');
var inited = false;

var init = function(){
    if(!(app.active_modules.user))
        throw new Error("Missing user module. Tag module depends on User module to work!");
    inited = true;
}

module.exports.init = init;
module.exports.router = router;
module.exports.register = action.register;
var Express = require('express');
var router = require('./route');
var action = require('./action');
var inited = false;

module.exports.init = function(){
    inited = true;    
}
module.exports.router = router;
module.exports.register = action.register;
module.exports.deRegister = action.deRegister;

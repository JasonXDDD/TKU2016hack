/// <reference path="../typings/assert/assert.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

var assert = require('assert');
var staticFile = require('../C-FAR/staticFile');
var util = require('util');
var Promise = require('bluebird');

// Fake app object
var app = {};
app.active_modules = {};
app.active_modules.staticFile = {};
app.active_modules.staticFile.mountedPath = '/static';
global.app = app;

describe('staticFile#register', function(){
    it('should register the path where this script living in', function(done){
        staticFile.register('/test', __dirname, true)
        .then(function(router){
            assert.equal(router.stack.length, 1);
            return staticFile.register('/test2', 'test'); 
        })
        .then(function(router){
            assert.equal(router.stack.length, 2);
            done();
        })
        
    })
});

describe('staticFile#deRegister', function(){
    it('should deregister the path just added', function(done){
        staticFile.deRegister('/test').then(function(router){
            assert.equal(router.stack.length, 0);
            done();
        })
    })
})
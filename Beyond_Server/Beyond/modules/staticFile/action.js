/// <reference path="../../../typings/bluebird/bluebird.d.ts" />
var Express = require('express');
var Promise = require('bluebird');
var fs = require('fs');
var Path = require('path');
var mkdirp = require('mkdirp');
fs.realpathAsync = Promise.promisify(fs.realpath);
fs.statAsync = Promise.promisify(fs.stat);
var EventEmitter = require('events').EventEmitter;
var Router = require('./route');
var Config = app.config;

// If absolutePath is not true, the folder in config.staticStorage + dirname will be used.

var register = function (path, dirname, absolutePath){
    return new Promise(function(resolve, reject){
        var readyEvent = new EventEmitter();
        absolutePath = absolutePath || false;
        if(!absolutePath){
            if (typeof dirname === 'object'){ // Why the type name of array is not 'array'?
                var tmpDirname = Config.staticStorage;  
                for(var i in dirname)
                    tmpDirname = Path.join(tmpDirname, dirname[i]); 
                dirname = tmpDirname;
            }
            else
                dirname = Path.join(Config.staticStorage, dirname);
        }
            
        var allRoutes = [];
        
        // Check if the path exists. If not, create it.
        fs.statAsync(dirname)
        .then(function(){readyEvent.emit('ready');})
        .catch(function(err){
            mkdirp(dirname, function(err){
                if(err) reject(err); 
                readyEvent.emit('ready');
            });
        });
        
        readyEvent.on('ready', function(){
            fs.realpathAsync(dirname)
            .then(function(realDirname){
                var routerInfo = Router.use(path, Express.static(realDirname));
                
                for(var i in Router.stack){
                    if(allRoutes.indexOf(Router.stack[i].regexp.toString()) >= 0){
                        Router.stack.slice(i);
                        return reject(new Error('Path already exists.'));
                    }
                    else
                        allRoutes.push(Router.stack[i].regexp.toString());
                }
                console.info("Mounted static path %s at %s", realDirname, app.active_modules.staticFile.mountedPath+path);
                return resolve(routerInfo);
            });
        })   
    });
}

var deRegister = function(path){
    return new Promise(function(resolve, reject){
        
        /* Get the real path we want to delete. */
        Router.use(path, Express.static(__dirname));
        var delpath = Router.stack[Router.stack.length-1].regexp.toString();
        Router.stack.slice(Router.stack.length-1);
        
        for(var i in Router.stack){
            if(Router.stack[i].regexp.toString() === delpath){
                Router.stack.splice(i)
                resolve(Router);
            }
        }
        reject('Path not exists.');
    })
}

module.exports.register = register;
module.exports.deRegister = deRegister;
/// <reference path="../typings/assert/assert.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

require('../');
var db = app.db;
var userAction = require('../C-FAR/user/action.js');
var assert = require('assert');

var newUsername = 'Testuser'+Date.now(),
    newEmail = 'Test'+Date.now()+'@test.com';


describe('User#addUser', function(){
    it('should add an user', function(done){
        userAction.addUser('Testfirst', 'Testlast', newUsername, newEmail, 'password', -1, 'zh-tw')
        .then(function(addeduser){
            userAction.getUserById(addeduser.uid)
            .then(function(founduser){
                assert.equal(founduser.permission, -1);
                done();
            })
        })
    })
});

describe('User#getUserById', function(){
    it('should return user uid=1', function(done){
        userAction.getUserById(1)
        .then(function(founduser){
            assert.equal(founduser.uid, 1);
            done();
        })
    })
});

describe('User#login', function(){
    it('should login successful.', function(done){
        userAction.login(newUsername, 'password')
        .then(function(founduser){
            assert.notEqual(founduser, undefined);
            done();
        })
    });
    
    it('should login failed.', function(done){
        userAction.login('NotExistUser', 'PASSWORD')
        .then(function(founduser){
            assert.equal(founduser, undefined);
            done();
        })
    })
});
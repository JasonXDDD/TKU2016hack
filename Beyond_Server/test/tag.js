/// <reference path="../typings/assert/assert.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

require('../');
var assert = require('assert');
var Tag = require('../C-FAR/tag');
var util = require('util');
var Promise = require('bluebird');

var tag = Tag.register('test');
var _idsList = [];

describe('tag#addTag', function(){
    it('should add a tag', function(done){
       
       var data = {tag: 'YEE', id: 10, user: 1, private: true};
       
       tag.addTag(data)
       .then(function(tag){
           assert.equal(tag.tag, data.tag);
           assert.equal(tag.id, data.id);
           assert.equal(tag.user, data.user);
           assert.equal(tag.private, data.private);
           _idsList.push(tag._id);
           return done();
       })
    })
})

describe('tag#addTags', function(){
    it('should add 5 tags', function(done){
        var datas = [
            {tag: 'YEE1', id: 10, user: 1, private: true},
            {tag: 'YEE2', id: 10, user: 1, private: true},
            {tag: 'YEE1', id: 11, user: 1, private: false},
            {tag: 'YEE4', id: 20, user: 2, private: true},
            {tag: 'YEE5', id: 30, user: 3, private: false}
        ]
        return tag.addTags(datas)
        .then(function(result){
            for(var i in datas){
                assert.equal(datas[i].tag, result[i].tag);
                assert.equal(datas[i].id, result[i].id);
                assert.equal(datas[i].user, result[i].user);
                assert.equal(datas[i].private, result[i].private);
            }
            assert.equal(result.length, 5);
            return done();
        })
    })
})

describe('tag#getTags', function(){
    it('should get tags added just now', function(done){
        Promise.all([
            tag.getTags({tag: 'YEE1'})
            .then(function(result){
                assert.deepEqual(result[0].tag, 'YEE1');
            }),
            tag.getTags({id: 10})
            .then(function(result){
                assert.equal(result.length, 3);
            })
        ])
        .then(function(){
            return done();
        })
    })
})

describe('tag#removeTag', function(){
    it('should remove tags added just now', function(done){
        tag.removeTag()
        .then(function(result){
            assert.equal(result.result.ok, 1);
            assert.equal(result.result.n, 6);
            return done();
        })
    })
})
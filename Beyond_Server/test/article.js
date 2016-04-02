/// <reference path="../typings/assert/assert.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

require('../'); // Initialize global variable.
var articleAction = require('../C-FAR/article/action.js');
var userAction = require('../C-FAR/user/action.js');
var assert = require('assert');

var newArticleId, newUserId;

beforeEach(function(){
    return userAction.addUser('Testfirst', 'Testlast', 'Testuser'+Date.now(), 'Test'+Date.now()+'@test.com', 'password', 2, 'zh-tw')
        .then(function(newuser){
            newUserId = newuser.uid;
        });
});

// TODO: add a fail getArticle case.

describe('Article#addArticle', function(){
    it('should add an article', function(done){
        articleAction.addArticle("Test article", "Test summary", "Test content", "http://cfar.tku.edu.tw/assets/index/img/background.jpg", newUserId, 0, true)
        .then(function(addedarticle){
            assert.deepEqual(addedarticle.title, "Test article");
            assert.deepEqual(addedarticle.summary, "Test summary");
            assert.deepEqual(addedarticle.content, "Test content");
            assert.deepEqual(addedarticle.cover_image_url, "http://cfar.tku.edu.tw/assets/index/img/background.jpg");
            addedarticle.getCreator().then(function(creator){
                assert.equal(creator.uid, newUserId);    
            });
            assert.equal(addedarticle.required_permission, 0);
            assert.equal(addedarticle.visable, true);
            newArticleId = addedarticle.id;
            return done();
        })
    })
});

describe('Article#getArticle', function(){
    it('should return the article added just now', function(done){
        articleAction.getArticle(newArticleId)
        .then(function(foundarticle){
            assert.equal(foundarticle.id, newArticleId);
            return done();
        })
    })
});

describe('Article#editArticle', function(){
    it('should edit the content of article added just now', function(done){
        articleAction.editArticle(newArticleId, "Edited article", "Edited summary", "Edited content", "http://nothisurl.co", 2, false)
        .then(function(editedarticle){
            assert.deepEqual(editedarticle.title, "Edited article");
            assert.deepEqual(editedarticle.summary, "Edited summary");
            assert.deepEqual(editedarticle.content, "Edited content");
            assert.deepEqual(editedarticle.cover_image_url, "http://nothisurl.co");
            assert.equal(editedarticle.required_permission, 2);
            assert.equal(editedarticle.visable, false);
            return done();
        })
    })
});

describe('Article#deleteArticle', function(){
    it('should delete the article added just now', function(done){
        articleAction.deleteArticle(newArticleId)
        .then(function(){
            return articleAction.getArticle(newArticleId)
            .then(function(deletedarticle){
                assert.equal(deletedarticle, null);
                return done();
            })
        })
    })
})
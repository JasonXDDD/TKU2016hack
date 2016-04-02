/// <reference path="../../../typings/mongoose/mongoose.d.ts" />
var mongoose = app.db.nosql;
var Promise = require('bluebird');
var tagSchema = require('./models').tag;

module.exports.register = function(name){
    var Tag = mongoose.model(name, tagSchema);
    
    Tag.addTag = function(options){
        if(typeof options.tag !== 'string') throw TypeError('Tag must be string!');
        if(typeof options.id !== 'number') throw TypeError('ID must be number!');
        if(options.user && typeof options.user !== 'number') throw TypeError('User must be number!');
        if(options.private && typeof options.private !== 'boolean') throw TypeError('Private must be boolean!');
        
        var newTag = new Tag({tag: options.tag, id: options.id, user: options.user, private: options.private});
        return newTag.save();
    }
    Tag.addTags = function(tagsArr){
        tagsArr.map(function(tag){
            Object.keys(tag).map(function(key){
                if(!(key === 'tag' || key === 'id' || key === 'user' || key === 'private'))
                    delete tag[key];
            })
        })
        return Tag.insertMany(tagsArr);
    }
    Tag.removeTag = function(options){
        return Tag.remove(options).exec();
    }
    Tag.getTags = function(options){
        return Tag.find(options).exec();
    }
    
    return Tag;
}
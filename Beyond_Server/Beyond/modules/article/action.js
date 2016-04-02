var Article = require('./models').Article;
var User = require('../user/models').User;
var sequelize = app.db;

var addArticle = function(title, summary, content, cover_image_url, creator, required_permission, visable){
    var article, user;
    return sequelize.transaction(function(t){
        return Article.create({
            title: title,
            summary: summary,
            content: content,
            cover_image_url: cover_image_url,
            required_permission: required_permission,
            visable: visable
        }, {transaction: t})
        .then(function(_article){
            article = _article;
            return User.findById(creator)
        }) 
        .then(function(_user){
            user = _user;
            return user.addArticle(article, {transaction: t});
        })
        .then(function(){
            return article.setCreator(user, {transaction: t});
        })
        .catch(function(err){
            console.error('Add article error!', err);
        })
    }) 
};

var getArticle = function(id){
    return Article.findById(id);
}

var editArticle = function(id, title, summary, content, cover_image_url, required_permission, visable){
    var tmpArticle;
    return sequelize.transaction(function(t){
        return Article.findById(id)
        .then(function(_article){
            tmpArticle = _article;
            
            if(title) tmpArticle.title = title;
            if(summary) tmpArticle.summary = summary;
            if(content) tmpArticle.content = content;
            if(cover_image_url) tmpArticle.cover_image_url = cover_image_url;
            if(required_permission) tmpArticle.required_permission = required_permission;
            if(visable != undefined) tmpArticle.visable = visable;
            
            return tmpArticle.save({transaction: t});
        }) 
    }) 
}

var deleteArticle = function(id){
    return sequelize.transaction(function(t){
       return Article.findById(id)
        .then(function(_article){
            return _article.destroy({transaction: t});
        }) 
    }) 
}

module.exports.addArticle = addArticle;
module.exports.getArticle = getArticle;
module.exports.editArticle = editArticle;
module.exports.deleteArticle = deleteArticle;
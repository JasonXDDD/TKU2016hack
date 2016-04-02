var Homework = require('./models').Homework;
var User = require('../user/models').User;
var sequelize = app.db;

var addHomework = function(creator, title, subject, deadline, description){
    var homework, user;
    return sequelize.transaction(function(t){
        return Homework.create({
            title: title,
            subject: subject,
            deadline: new Date(deadline),
            description: description
        }, {transaction: t})
        .then(function(_homework){
            homework = _homework;
            return User.findById(creator)
        }) 
        .then(function(_user){
            user = _user;
            return user.addHomework(homework, {transaction: t});
        })
        .then(function(){
            return homework.setCreator(user, {transaction: t});
        })
        .catch(function(err){
            console.error('Add homework error!', err);
        })
    }) 
};

var getHomework = function(id){
    return Homework.findById(id);
}

var getHomeworkListByUser = function(userId){
    return Homework.findAll({
        where: { creatorUid: userId }
    });
}

var editHomework = function(id, title, subject, deadline, description){
    return sequelize.transaction(function(t){
        return Homework.findById(id)
        .then(function(_homework){
            tmpHomework = _homework;
            
            if(title) tmpHomework.title = title;
            if(subject) tmpHomework.subject = subject;
            if(deadline) tmpHomework.deadline = new Date(deadline);
            if(description) tmpHomework.description = description;
            
            return tmpHomework.save({transaction: t});
        }) 
    }) 
}

var deleteHomework = function(id){
    return sequelize.transaction(function(t){
       return Homework.findById(id)
        .then(function(_homework){
            return _homework.destroy({transaction: t});
        }) 
    }) 
}

module.exports.addHomework = addHomework;
module.exports.getHomework = getHomework;
module.exports.editHomework = editHomework;
module.exports.deleteHomework = deleteHomework;
module.exports.getHomeworkListByUser = getHomeworkListByUser;
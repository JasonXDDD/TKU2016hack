var Exam = require('./models').Exam;
var User = require('../user/models').User;
var sequelize = app.db;

var addExam = function(creator, title, subject, location, time, description){
    var exam, user;
    time = new Date(time);
    return sequelize.transaction(function(t){
        return Exam.create({
            title: title,
            subject: subject,
            location: location,
            time: time,
            description: description
        }, {transaction: t})
        .then(function(_exam){
            exam = _exam;
            return User.findById(creator)
        }) 
        .then(function(_user){
            user = _user;
            return user.addExam(exam, {transaction: t});
        })
        .then(function(){
            return exam.setCreator(user, {transaction: t});
        })
        .catch(function(err){
            console.error('Add timetable error!', err);
        })
    }) 
};

var getExam = function(id){
    return Exam.findById(id);
}

var getExamListByUser = function(userId){
    return Exam.findAll({
        where: { creatorUid: userId }
    });
}

var editExam = function(id, title, subject, location, time, description){
    return sequelize.transaction(function(t){
        return Exam.findById(id)
        .then(function(_exam){
            tmpExam = _exam;
            
            if(title) tmpExam.title = title;
            if(subject) tmpExam.subject = subject;
            if(location) tmpExam.location = location;
            if(time) tmpExam.time = new Date(time);
            if(description) tmpExam.description = description;
            
            return tmpExam.save({transaction: t});
        }) 
    }) 
}

var deleteExam = function(id){
    return sequelize.transaction(function(t){
       return Exam.findById(id)
        .then(function(_exam){
            return _exam.destroy({transaction: t});
        }) 
    }) 
}

module.exports.addExam = addExam;
module.exports.getExam = getExam;
module.exports.editExam = editExam;
module.exports.deleteExam = deleteExam;
module.exports.getExamListByUser = getExamListByUser;
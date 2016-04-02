var Timetable = require('./models').Timetable;
var User = require('../user/models').User;
var sequelize = app.db;

var addTimetable = function(creator, tablename, subject, weekday, classroom, teacher, start_time, end_time, description){
    var timetable, user;
    return sequelize.transaction(function(t){
        return Timetable.create({
            tablename: tablename,
            subject: subject,
            weekday: weekday,
            classroom: classroom,
            start_time: start_time,
            end_time: end_time,
            description: description
        }, {transaction: t})
        .then(function(_timetable){
            timetable = _timetable;
            return User.findById(creator)
        }) 
        .then(function(_user){
            user = _user;
            return user.addTimetable(timetable, {transaction: t});
        })
        .then(function(){
            return timetable.setCreator(user, {transaction: t});
        })
        .catch(function(err){
            console.error('Add timetable error!', err);
        })
    }) 
};

var getTimetable = function(id){
    return Timetable.findById(id);
}

var editTimetable = function(id, tablename, subject, weekday, classroom, teacher, start_time, end_time, description){
    return sequelize.transaction(function(t){
        return Timetable.findById(id)
        .then(function(_timetable){
            tmpTimetable = _timetable;
            
            if(tablename) tmpArticle.tablename = tablename;
            if(subject) tmpArticle.subject = subject;
            if(weekday) tmpArticle.weekday = weekday;
            if(classroom) tmpArticle.classroom = classroom;
            if(teacher) tmpArticle.teacher = teacher;
            if(start_time) tmpArticle.start_time = start_time;
            if(end_time) tmpArticle.end_time = end_time;
            if(description) tmpArticle.description = description;
            
            return tmpArticle.save({transaction: t});
        }) 
    }) 
}

var deleteTimetable = function(id){
    return sequelize.transaction(function(t){
       return Timetable.findById(id)
        .then(function(_timetable){
            return _timetable.destroy({transaction: t});
        }) 
    }) 
}

module.exports.addTimetable = addTimetable;
module.exports.getTimetable = getTimetable;
module.exports.editTimetable = editTimetable;
module.exports.deleteTimetable = deleteTimetable;
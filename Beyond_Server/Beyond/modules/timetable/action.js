var Timetable = require('./models').Timetable;
var User = require('../user/models').User;
var sequelize = app.db;

var addTimetable = function(creator, tablename, subject, weekday, classroom, teacher, start_time, end_time, description){
    var timetable, user;
    start_time = moment(0).add(start_time.split(':')[0], 'hours').add(start_time.split(':')[1], 'minutes');
    end_time = moment(0).add(end_time.split(':')[0], 'hours').add(end_time.split(':')[1], 'minutes');
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

var getTimetableListByUser = function(userId){
    return Timetable.findAll({
        where: { creatorUid: userId }
    });
}

var editTimetable = function(id, tablename, subject, weekday, classroom, teacher, start_time, end_time, description){
    return sequelize.transaction(function(t){
        return Timetable.findById(id)
        .then(function(_timetable){
            tmpTimetable = _timetable;
            
            if(tablename) tmpTimetable.tablename = tablename;
            if(subject) tmpTimetable.subject = subject;
            if(weekday) tmpTimetable.weekday = weekday;
            if(classroom) tmpTimetable.classroom = classroom;
            if(teacher) tmpTimetable.teacher = teacher;
            if(start_time) tmpTimetable.start_time = moment(0).add(start_time.split(':')[0], 'hours').add(start_time.split(':')[1], 'minutes');
            if(end_time) tmpTimetable.end_time = moment(0).add(end_time.split(':')[0], 'hours').add(end_time.split(':')[1], 'minutes');
            if(description) tmpTimetable.description = description;
            
            return tmpTimetable.save({transaction: t});
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
module.exports.getTimetableListByUser = getTimetableListByUser;
var Express = require('express');
var action = require('./action');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = Express.Router();
var User = require('../user/models').User;
var moment = require('moment');

router.use('/assets', Express.static(__dirname + '/public/assets'));
    
router.get('/', function(req, res){
    if(!(req.query.token))
        res.status(401).end();
    User.findOne({where: {token: req.query.token}})
    .then(function(user){
        return action.getTimetableListByUser(user.uid)  
    })    
    .then(function(list){
        return res.status(200).json(list);
    })
    .catch(function(err){
        return res.status(500).json({message: 'Get timetable list failed - ' + err});
    })
})    
    
router.get('/:id', function(req, res){
    return action.getTimetable(req.params['id'])
    .then(function(timetable){
        res.status(200).json(timetable);
    })
    .catch(function(err){
        console.error("Get timetable failed - " + err);
        res.status(500).end();
    })
});

router.post('/add', jsonParser, function(req, res, next){
    if(!(req.body.token))
        res.status(401).end();
    User.findOne({where: {token: req.body.token}})
    .then(function(user){
        if (!user) return res.status(403).end();
        if ( !(req.body.tablename)  ||
             !(req.body.subject)    ||
             !(req.body.weekday)    ||
             !(req.body.start_time) ||
             !(req.body.end_time)
             ){
            res.status(400).json({message: 'Missing required fields.'}).end();
        }
        else{
            var body = req.body;
            return action.addTimetable(user.uid, body.tablename, body.subject, body.weekday, body.classroom, body.teacher, body.start_time, body.end_time, body.description)
                .then(function(_timetable){
                    res.status(201).json(_timetable).end();
                });
        }
    })
});

router.post('/:id/edit', jsonParser, function(req, res){
    User.findOne({where: {
        token: req.body.token
    }})
    .then(function(user){
        console.log(user);
        if(!user) return res.status(403).json({message: 'You have no permission to do it. YEE'}).end();
        if(user.permission < 2){ // Not admin, check if is owner.
            action.getTimetable(req.params['id'])
            .then(function(_timetable){
                if(_timetable.creatorUid != user.uid){
                    console.log(_timetable);
                    res.status(403).json({message: 'You have no permission to do it.'}).end();
                    return;
                }
            });
        }
        var body = req.body;
        return action.editTimetable(req.params['id'], body.tablename, body.subject, body.weekday, body.classroom, body.teacher, body.start_time, body.end_time, body.description)
            .then(function(_timetable){
                res.status(200).json(_timetable).end();
            })    
    })
    
});

router.post('/:id/delete', jsonParser, function(req, res){
    User.findOne({where: {
        token: req.body.token
    }})
    .then(function(user){
        if(!user) return res.status(403).json({message: 'You have no permission to do it.'}).end();
        if(user.permission < 2){ // Not admin, check if is owner.
            action.getTimetable(req.params['id'])
            .then(function(_timetable){
                if(!_timetable) {res.status(404).json({message: 'Timetable not found.'}).end(); return; }
                if(_timetable.creatorUid != user.uid){
                    res.status(403).json({message: 'You have no permission to do it.'}).end();
                    return;
                }
            });
        }
        return action.deleteTimetable(req.params['id'])
            .then(function(){
                res.status(200).json({message: 'Delete successful.'}).end();
            })
            .catch(function(err){
                res.status(500).json({message: 'Delete failed.' + err}).end();
            })    
    })
    
});

module.exports = router;
var Express = require('express');
var action = require('./action');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = Express.Router();

router.use('/assets', Express.static(__dirname + '/public/assets'));
    
router.get('/:id', function(req, res){
    return action.getTimetable(req.params['id'])
        .catch(function(err){
            console.error("Get timetable failed - " + err);
            res.status(500).end();
        })
});

router.post('/add', jsonParser, function(req, res, next){
    if(!(req.session.permission))
        res.status(401).end();
    else if (!(req.body.tablename)  ||
             !(req.body.subject)    ||
             !(req.body.weekday)    ||
             !(req.body.start_time) ||
             !(req.body.end_time)
             ){
        res.status(400).json({message: 'Missing required fields.'}).end();
    }
    else{
        var body = req.body;
        return action.addArticle(req.session.uid, body.tablename, body.subject, body.weekday, body.classroom, body.teacher, body.start_time, body.end_time, body.description)
            .then(function(_timetable){
                res.status(201).json(_timetable).end();
            });
    }
});

router.post('/:id/edit', function(req, res){
    if(req.session.permission < 2){ // Not admin, check if is owner.
        action.getTimetable(req.params['id'])
        .then(function(_timetable){
            if(_timetable.creator != req.session.uid){
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
});

router.post('/:id/delete', function(req, res){
    if(req.session.permission < 2){ // Not admin, check if is owner.
        action.getArticle(req.params['id'])
        .then(function(_timetable){
            if(_timetable.creator != req.session.uid){
                res.status(403).json({message: 'You have no permission to do it.'}).end();
                return;
            }
        });
    }
    return action.deleteArticle(req.params['id'])
        .then(function(){
            res.status(200).json({message: 'Delete successful.'}).end();
        })
        .catch(function(err){
            res.status(500).json({message: 'Delete failed.'}).end();
        })
});

module.exports = router;
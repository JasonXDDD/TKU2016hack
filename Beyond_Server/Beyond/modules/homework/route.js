var Express = require('express');
var action = require('./action');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = Express.Router();
var User = require('../user/models').User;
var moment = require('moment');

router.use('/assets', Express.static(__dirname + '/public/assets'));
    
router.get('/:id', function(req, res){
    return action.getHomework(req.params['id'])
    .then(function(homework){
        res.status(200).json(homework);
    })
    .catch(function(err){
        console.error("Get homework failed - " + err);
        res.status(500).end();
    })
});

router.post('/add', jsonParser, function(req, res, next){
    if(!(req.body.token))
        res.status(401).end();
    User.findOne({where: {token: req.body.token}})
    .then(function(user){
        if (!user) return res.status(403).end();
        if (!(req.body.title)  ||
             !(req.body.subject)    ||
             !(req.body.deadline)
             ){
            res.status(400).json({message: 'Missing required fields.'}).end();
        }
        else{
            var body = req.body;
            return action.addHomework(user.uid, body.title, body.subject, body.deadline, body.description)
                .then(function(_homework){
                    res.status(201).json(_homework).end();
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
        if(!user) return res.status(403).json({message: 'You have no permission to do it.'}).end();
        if(user.permission < 2){ // Not admin, check if is owner.
            action.getHomework(req.params['id'])
            .then(function(_homework){
                if(_homework.creatorUid != user.uid){
                    console.log(_homework);
                    res.status(403).json({message: 'You have no permission to do it.'}).end();
                    return;
                }
            });
        }
        var body = req.body;
        return action.editHomework(req.params['id'], body.title, body.subject, body.deadline, body.description)
            .then(function(_homework){
                res.status(200).json(_homework).end();
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
            action.getHomework(req.params['id'])
            .then(function(_homework){
                if(!_homework) {res.status(404).json({message: 'Homework not found.'}).end(); return; }
                if(_homework.creatorUid != user.uid){
                    res.status(403).json({message: 'You have no permission to do it.'}).end();
                    return;
                }
            });
        }
        return action.deleteHomework(req.params['id'])
            .then(function(){
                res.status(200).json({message: 'Delete successful.'}).end();
            })
            .catch(function(err){
                res.status(500).json({message: 'Delete failed.' + err}).end();
            })    
    })
    
});

module.exports = router;
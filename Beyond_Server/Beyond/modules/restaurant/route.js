var Express = require('express');
var action = require('./action');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = Express.Router();
var User = require('../user/models').User;
var moment = require('moment');

router.use('/assets', Express.static(__dirname + '/public/assets'));
    
router.get('/restaurant/:id', function(req, res){
    return action.getRestaurant(req.params['id'])
    .then(function(restaurant){
        res.status(200).json(restaurant);
    })
    .catch(function(err){
        console.error("Get restaurant failed - " + err);
        res.status(500).end();
    })
});

router.get('/restaurant/', function (req, res) {
    if(!(req.query.token))
        res.status(401).end();
    User.findOne({where: {token: req.query.token}})
    .then(function(user){
        return action.getRestaurantListByArea(user.uid, req.query.area);  
    })    
    .then(function(list){
        return res.status(200).json(list);
    })
    .catch(function(err){
        return res.status(500).json({message: 'Get restaurant list failed - ' + err});
    })
})

router.post('/restaurant/add', jsonParser, function(req, res, next){
    if(!(req.body.token))
        res.status(401).end();
    User.findOne({where: {token: req.body.token}})
    .then(function(user){
        if (!user) return res.status(403).end();
        if (!(req.body.name)){
            res.status(400).json({message: 'Missing required fields.'}).end();
        }
        else{
            var body = req.body;
            return action.addRestaurant(user.uid, body.name, body.address, body.lat, body.lng, body.area, body.suiteTime, body.avarage_cost, body.mealType)
                .then(function(_restaurant){
                    res.status(201).json(_restaurant).end();
                });
        }
    })
});

router.post('/restaurant/:id/edit', jsonParser, function(req, res){
    User.findOne({where: {
        token: req.body.token
    }})
    .then(function(user){
        console.log(user);
        if(!user) return res.status(403).json({message: 'You have no permission to do it.'}).end();
        if(user.permission < 2){ // Not admin, check if is owner.
            action.getRestaurant(req.params['id'])
            .then(function(_restaurant){
                if(_restaurant.creatorUid != user.uid){
                    console.log(_restaurant);
                    res.status(403).json({message: 'You have no permission to do it.'}).end();
                    return;
                }
            });
        }
        var body = req.body;
        return action.editRestaurant(req.params['id'], body.name, body.address, body.lat, body.lng, body.area, body.suiteTime, body.avarage_cost, body.mealType)
            .then(function(_restaurant){
                res.status(200).json(_restaurant).end();
            })    
    }) 
});

router.post('/restaurant/:id/delete', jsonParser, function(req, res){
    User.findOne({where: {
        token: req.body.token
    }})
    .then(function(user){
        if(!user) return res.status(403).json({message: 'You have no permission to do it.'}).end();
        if(user.permission < 2){ // Not admin, check if is owner.
            action.getRestaurant(req.params['id'])
            .then(function(_restaurant){
                if(!_restaurant) {res.status(404).json({message: 'Restaurant not found.'}).end(); return; }
                if(_restaurant.creatorUid != user.uid){
                    res.status(403).json({message: 'You have no permission to do it.'}).end();
                    return;
                }
            });
        }
        return action.deleteRestaurant(req.params['id'])
            .then(function(){
                res.status(200).json({message: 'Delete successful.'}).end();
            })
            .catch(function(err){
                res.status(500).json({message: 'Delete failed.' + err}).end();
            })    
    })
    
});

router.post('/eatlog/add', jsonParser, function(req, res){
    if(!(req.body.token))
        res.status(401).end();
    User.findOne({where: {token: req.body.token}})
    .then(function(user){
        if (!user) return res.status(403).end();
        if (!(req.body.content) ||
            !(req.body.cost) ||
            !(req.body.date)){
            res.status(400).json({message: 'Missing required fields.'}).end();
        }
        else{
            var body = req.body;
            return action.addEatLog(user.uid, body.restaurant_id, body.content, body.cost, body.lat, body.date)
                .then(function(_eatlog){
                    res.status(201).json(_eatlog).end();
                });
        }
    })
});

router.get('/eatlog/:id', function(req, res){
    return action.getEatLog(req.params['id'])
    .then(function(eatlog){
        res.status(200).json(eatlog);
    })
    .catch(function(err){
        console.error("Get eatlog failed - " + err);
        res.status(500).end();
    })
})

router.get('/eatlog', function(req, res){
    if(!(req.query.token))
        res.status(401).end();
    User.findOne({where: {token: req.query.token}})
    .then(function(user){
        return action.getEatLogListByUser(user.uid)  
    })    
    .then(function(list){
        return res.status(200).json(list);
    })
    .catch(function(err){
        return res.status(500).json({message: 'Get eatlog list failed - ' + err});
    })
})

module.exports = router;
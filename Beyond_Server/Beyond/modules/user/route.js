var Express = require('express');
var action = require('./action');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var passport = require('passport');

var needLogin = function(req, res, next){
    if(req.isAuthenticated())
        next();
    req.status(401).end();
}

var router = Express.Router();

router.use('/assets', Express.static(__dirname + '/public/assets'));
    
router.post('/add', jsonParser, function(req, res, next){
    var body = req.body;
    
    if(!(req.body.email)    ||
       !(req.body.password) ||
       !(req.body.username))
       res.status(400).json({message: 'Missing required fields.'}).end();
    else{
        action.addUser(body.firstName, body.lastName, body.username, body.email, body.password, body.permission, body.language)
        .then(function(user){
            res.status(201).json(user);
        })
        .catch(function(err){
            res.status(500).json({message: 'User add failed - ' + err});
        })    
    }
});

router.get('/detail', function(req, res){
    res.status(501).send("<h1>Not implemented</h1>");
});

router.post('/edit', function(req, res){
    res.status(501).send("<h1>Not implemented</h1>");
});

router.post('/delete', function(req, res){
    res.status(501).send("<h1>Not implemented</h1>");
});

router.post('/login', jsonParser, passport.authenticate('local', { session: false }), function(req, res, next){
    res.status(200).json(req.user);
    // res.status(200).json({message: 'Login successed.'});
});

router.get('/logout', function(req, res){
    req.logout();
    res.status(200).json({message: 'Logout successed.'});
});

module.exports = router;
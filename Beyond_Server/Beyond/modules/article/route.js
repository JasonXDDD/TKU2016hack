var Express = require('express');
var action = require('./action');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = Express.Router();

router.use('/assets', Express.static(__dirname + '/public/assets'));
    
router.get('/:id', function(req, res){
    return action.getArticle(req.params['id'])
        .then(function(_article){
            if(_article.required_permission > 0){
                if(!(req.session.permission))
                    res.status(401).end();
                else if(req.session.permission < _article.required_permission)
                    res.status(403).end();
                else    
                    res.status(200).json(_article).end();
            }
        })
        .catch(function(err){
            console.error("Add article failed - " + err);
            res.status(500).end();
        })
});

router.post('/add', jsonParser, function(req, res, next){
    if(!(req.session.permission))
        res.status(401).end();
    else if (!(req.body.title)){
        res.status(400).json({message: 'Missing title.'}).end();
    }
    else{
        var body = req.body;
        return action.addArticle(body.title, body.summary, body.content, body.cover_image_url, req.session.uid, body.required_permission, body.visable)
            .then(function(_article){
                res.status(201).json(_article).end();
            });
    }
});

router.post('/:id/edit', function(req, res){
    if(req.session.permission < 2){ // Not admin, check if is owner.
        action.getArticle(req.params['id'])
        .then(function(_article){
            if(_article.creator != req.session.uid){
                res.status(403).json({message: 'You have no permission to do it.'}).end();
                return;
            }
        });
    }
    var body = req.body;
    return action.editArticle(req.params['id'], body.title, body.summary, body.content, body.cover_image_url, body.required_permission, body.visable)
        .then(function(_article){
            res.status(200).json(_article).end();
        })
});

router.post('/:id/delete', function(req, res){
    if(req.session.permission < 2){ // Not admin, check if is owner.
        action.getArticle(req.params['id'])
        .then(function(_article){
            if(_article.creator != req.session.uid){
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
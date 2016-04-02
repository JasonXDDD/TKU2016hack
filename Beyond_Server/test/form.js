/// <reference path="../typings/assert/assert.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />


var formAction = require('../C-FAR/form/action.js');
var userAction = require('../C-FAR/user/action.js');
var assert = require('assert');

var questions = [
            {
                title: 'Q01',
                description: 'This is Q01',
                questionType: 'textbox'
            },
            {
                title: 'Q02',
                description: 'This is Q02',
                questionType: 'textarea'
            },
            {
                title: 'Q03',
                description: 'This is Q03',
                questionType: 'singleChoice',
                singleChoiceOptions: [
                    "Opt01", "Opt02", "Opt03"
                ]
            },
            {
                title: 'Q04',
                description: 'This is Q04',
                questionType: 'multipleChoice',
                multipleChoiceOptions: [
                    "Opt01", "Opt02", "Opt03"
                ]
            },
            {
                title: 'Q05',
                description: 'This is Q05',
                questionType: 'dropdown',
                dropdownOptions: [
                    "Opt01", "Opt02", "Opt03"
                ]
            },
            {
                title: 'Q06',
                description: 'This is Q06',
                questionType: 'score',
                scoreMax: 10,
                scoreMin: 1
            },
            {
                title: 'Custom HR',
                questionType: 'custom',
                custom: '<hr />'
            }
        ];

var answers = [
    { answer: 'YEE' },
    { answer: 'YEEEE\nYEEEEEEEEEE'},
    { answer: 1},
    { answer: [0, 2]},
    { answer: 1},
    { answer: 5},
    { answer: undefined }
];

var newformid, newresponseid, newUserId;
var newquestionids = [];

beforeEach(function(){
    return userAction.addUser('Testfirst', 'Testlast', 'Testuser'+Date.now(), 'Test'+Date.now()+'@test.com', 'password', 2, 'zh-tw')
        .then(function(newuser){
            newUserId = newuser.uid;
        });
});

describe('Form#addForm', function(){
    it('should add a form', function(done){ 
        return formAction.addForm(newUserId, 'Test form', 'This is a this form', questions)
        .then(function(addedform){
            newformid = addedform.id;
            return formAction.getForm(addedform.id)
            .then(function(foundform){
                assert.equal(foundform.Questions.length, 7);
                assert.equal(foundform.Questions[0].questionType, 'textbox');
                assert.equal(foundform.Questions[1].questionType, 'textarea');
                assert.equal(foundform.Questions[2].questionType, 'singleChoice');
                assert.equal(foundform.Questions[3].questionType, 'multipleChoice');
                assert.equal(foundform.Questions[4].questionType, 'dropdown');
                assert.equal(foundform.Questions[5].questionType, 'score');
                assert.equal(foundform.Questions[6].questionType, 'custom');
                for(var i in foundform.Questions)
                    newquestionids.push(foundform.Questions[i].qid);
                return done();
            })
        })
    })
});

describe('Form#getForm', function(){
    it('should return form added just now', function(done){
        return formAction.getForm(newformid)
        .then(function(foundform){
            assert.equal(foundform.id, newformid);
            return done();
        })
    })
});

describe('Form#getAllForms', function(){
    it('should return all of the form', function(done){
        return formAction.getAllForms()
        .then(function(foundforms){
            for (var i in foundforms)
                assert.notEqual(foundforms[i].title, undefined); // Title is a required field.
            return done();
        })
    })
});

describe('Form#answerForm', function(){
    it('should return all of the answer passed to function', function(done){
        return formAction.getForm(newformid)
        .then(function(newform){
            for(var i in newform.Questions)
                answers[i].qid = newform.Questions[i].qid;
            return formAction.answerForm(newformid, answers)
            .then(function(response){
                newresponseid = response.resid;
                assert.equal(response.Answers[0].textbox, answers[0].answer);
                assert.equal(response.Answers[1].textarea, answers[1].answer);
                assert.equal(response.Answers[2].singleChoice, answers[2].answer);
                assert.deepEqual(JSON.parse(response.Answers[3].multipleChoice), answers[3].answer);
                assert.equal(response.Answers[4].dropdown, answers[4].answer);
                assert.equal(response.Answers[5].score, answers[5].answer);
                // Custom field has no answer. It just for showing custom HTML.
                assert.equal(response.Answers.length, 6);
                return done();
            })    
        })    
    })
});

describe('From#getResponse', function(){
    it('should return response added just now', function(done){
        return formAction.getResponse(newresponseid)
        .then(function(response){
            assert.equal(response.resid, newresponseid);
            return done();
        })
    })
})


describe('Form#getQuestion', function(){
    it('should return the first question added just now', function(done){
        return formAction.getQuestion(newquestionids[0])
        .then(function(question){
            assert.equal(question.qid, newquestionids[0]);
            return done();
        })
    })
});
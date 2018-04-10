var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');
var User = require('../models/users');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET member page. */
router.get('/member', function(req, res, next) {
  try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            res.render('member');
        }
    }catch (err) {
            /*res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });*/
            res.render('login');
            
        }
});

/*GET Games Page*/
router.get('/games', function(req, res, next) {
  try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            res.render('games');
        }
    }catch (err) {
            /*res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });*/
            res.render('login');
            
        }
});

/*GET profile page*/
router.get('/myProfile', function(req, res, next) {
  try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            res.render('myProfile');
        }
    }catch (err) {
            /*res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });*/
            res.render('login');
            
        }
});

//get Users
router.get('/getUsers', function(req, res, next) {

    User.find({}, function (err, users) {
        if (err)
            res.send(err);
        res.json(users);
    });
});

//get USER
router.get('/getUser/:id', function(req, res, next) {
    var id = req.params.id;

    User.find({_id:id}, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
});

//delete User
router.delete('/removeUser/:id', function(req, res, next){

    var id = req.params.id;
    User.remove({_id:id}, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully removed the user"});
    });
});

/* DOESNT WORK
//delete all Users
router.delete('/removeAllUsers', function(req, res, next){


     User.find({}, function (err, users) {
        User.remove({users}, function (err,users) {
            if (err)
             res.send(err);

            res.json({status : "Successfully removed all the user: "});
        });
    });
});     */
    
//Add comment
router.post('/addComment', function(req, res, next) {   
    // Extract the request body which contains the comments
    comment = new Comment(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

//get Comments
router.get('/getComments', function(req, res, next) {

    Comment.find({}, function (err, comments) {
        if (err)
            res.send(err);
        res.json(comments);
    });
});



//update Comments
router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.update({_id:id}, req.body, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

/**
 * Deletes a comment from the database
 */
router.delete('/removeComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.remove({_id:id}, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully removed the document"});
    });
});


//Get feed page
router.get('/feed', function(req, res, next) {
  try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            res.render('feed');
        }
    }catch (err) {
            /*res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });*/
            res.render('login');
            
        }
});

//Get index page
router.get('/index', function(req, res, next) {
    res.render('index',{title: 'index'});
});


function verifyJwt(jwtString) {

    var value = jwt.verify(jwtString, 'CSIsTheWorst');
    return value;
}

module.exports = router;
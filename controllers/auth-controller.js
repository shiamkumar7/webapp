var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const User = require('../models/user-model');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var verifyToken = require('./verifyjwt');


router.post('/', (req, res) => {
    
    User.create({
      name : req.body.username,
      email : req.body.email,
      password : req.body.password
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id:user._id}, config.secret, {
        expiresIn: 86400
         // expires in 24 hours
      });
      
      res.json({ auth: true, message:'Auth successful',token: token });
    });
    
  
  });

  router.get('/me', verifyToken, function(req, res, next) {

    User.findById(req.userId, { password: 0 }, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      res.status(200).send(user);
    });
  
  });


 
 module.exports= router;
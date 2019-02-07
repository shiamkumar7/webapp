const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});
   
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    });

   
});

passport.use(
    new GoogleStrategy({
        callbackURL:'/auth/google/redirect',
        clientID:"81366145862-u7l2jdtiqf00d6crm8kgvo2v47m8oupo.apps.googleusercontent.com",
        clientSecret:"iOJ3rDeTLdTvhze4CkSo6B78"
    },(accessToken,refreshToken,profile,done) =>{
        //checkif user already exists
        
        User.findOne({googleId:profile.id}).then((currentUser) =>{
            if(currentUser){
                //already have the user
                console.log('user is',currentUser);
                done(null,currentUser);

            }else{
                //create user in our db
                new User({
                    username:profile.displayName,
                    googleId:profile.id
                }).save().then((newUser) => {
                    console.log('new User created'+ newUser);
                    done(null,newUser);
                });
            }
        });




        //callback function
       
    }
));

const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login',(req,res) =>{
    res.redirect('/profile/');
});

//auth logout
router.get('/logout',(req,res) => {


});




//auth with google
router.get('/google',passport.authenticate('google',{
    scope:['profile']
      
}));

//callback route for google
router.get('/google/redirect',passport.authenticate('google'),(req,res) => {
res.redirect('/profile/');
});




module.exports = router;
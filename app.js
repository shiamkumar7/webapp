const express = require('express');

const app = express();
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const profileRoutes = require('./routes/profile-routes');
var AuthController = require('./controllers/auth-controller');
app.set('view engine','ejs');



app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:['secret']
}));
app.use(passport.initialize());
app.use(passport.session());



app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

app.use('/', AuthController);





app.use(express.static('./assets'));

//connect to mongodb
mongoose.connect('mongodb://localhost/MEANStackDB',() =>{
    console.log('connected to mongodb');
});


app.get('/',(req,res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('listening to port 3000 ');
});

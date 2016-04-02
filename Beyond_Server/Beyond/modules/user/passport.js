var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var action = require('./action');

// Put all necessary information in session, so we don't have to get them from database every time. 
passport.serializeUser(function(user, done){
    return action.getUserById(user.uid)
    .then(function(user){
        return done(null, user);    
    });
});

passport.deserializeUser(function(user, done){
    return done(null, user);     
});

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, function(email, password, done){
    return action.getUserByEmail(email, true)
    .then(function(user){
        if(!user) return done(null, false);
        if(!(user.validatePassword(password))) return done(null, false);
        user = action.deleteSensitiveInformation(user); // Don't let frontend know user's password.
        user.updateLoginTime();
        return user.generateToken()
        .then(function(){
            return done(null, user);    
        })
    })
    .catch(function(err){
        return done(err);
    })
}));

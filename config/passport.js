var jwtstartegy = require('passport-jwt').Strategy,
    ExtarctJwt = require('passport-jwt').ExtractJwt,
    User = require('../models/user');

module.exports = function(passport){

    var opts = {};
    opts.jwtFromRequest = ExtarctJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = process.env.KEY;

    passport.use(new jwtstartegy(opts,(jwt_payload,done) => {

        User.getUserById(jwt_payload._id,(err,user) => {

            if(err){
                return done(err, false);
            }

            if(user){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        })
    }))

}
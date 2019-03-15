var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');


var UserSchema = mongoose.Schema({

    name: { type: String },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {

    const user = this;

    if (!this.isModified('password'))  {
      return next();
    }

   //Generate Salt Value
   bcrypt.genSalt(10, (err, salt) => {
     if (err) {
       return next(err);
     }
     //Use this salt value to hash password
     bcrypt.hash(user.password, salt, (err, hash) => {
       if (err) {
         return next(err);
       }
        user.password = hash;
       next();
     });

   });

});

var User = mongoose.model('User', UserSchema);

module.exports = User;

module.exports.getUserById = function(id,callback){

    User.findById(id,callback);
};

module.exports.getUserByUsername = function(username,callback){

    var query = {username: username};
    User.findOne(query,callback);
};

module.exports.comparePassowrd = function(plainPass,hashedPass,callback){

    bcrypt.compare(plainPass,hashedPass,(err,isMatch) => {

        if(err){
            next(err);
        }

        callback(null, isMatch);

    });

};
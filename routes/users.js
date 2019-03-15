var express = require('express'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    User = require('../models/user'),
    Route = express.Router();
    


Route.post('/register', (req,res) => {

    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    newUser.save((err,user) => {

        if(err){
            return res.send({
                success: false,
                message: "Error, while saving try again"
            });
        }

        if(!user){
            return res.send({
                success: false,
                message: "User not found"
            });
        }

        return res.send({
            success: true,
            user,
            message: "User Registered"
        });

    });
});
    

Route.post('/login', (req,res) => {

    var username = req.body.username,
        password = req.body.password;

    User.getUserByUsername(username,(err,user) => {

        
        if(err){
            return res.send({
                success: false,
                message: "Error, while saving try again"
            })
        }

        if(!user){
            return res.send({
                success: false,
                message: "User not found"
            });
        }

        User.comparePassowrd(password, user.password, (err, isMatch) => {

            if(err){
                return res.send({
                    success: false,
                    message: "Error, password not matched"
                })
            }

            if(isMatch){

                var token = jwt.sign(user.toJSON(), process.env.KEY,{
                    expiresIn: 604800 //1 week
                })
  
                res.send({
                    success: true,
                    token: "jwt " + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        username: user.username
                    }
                })
            }
            else{

                return res.send({
                    success: false,
                    message: "Wrong password"
                })
            }

        })

    })
});

Route.get('/profile',passport.authenticate('jwt', {session: false}) ,(req,res) => {

    res.json({user: req.user});
});



module.exports = Route;
const LocalStrategy = require('passport-local');
const Student = require("../models/student");
const Bank = require("../models/bank");
const Gov = require("../models/government");

module.exports =  function(passport) {
    //Local Strategy for User
    passport.use('studentlocal', new LocalStrategy(Student.authenticate()));
    passport.use('banklocal', new LocalStrategy(Bank.authenticate()));
    passport.use('govlocal', new LocalStrategy(Gov.authenticate()));

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, {
            id: user.id,
            username: user.username,
            picture: user.picture
            });
        });
    });

    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, user);
        });
    });
}
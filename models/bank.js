const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const bankSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    userType: String,
    fund: Number
  });
  
  bankSchema.plugin(passportLocalMongoose);

  module.exports = mongoose.model('Bank', bankSchema);
const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    photo: String,
    signature: String,
    dob: String,
    address: String,
    pan: String,
    aadhaar: Number,
    institute: String,
    bonafide: String,
    feeStructure: String,
    userType: String,
    state: String,
    loanAmount: Number,
    loanStatus: Number,
    bank: String,
    location: Boolean,
    currentState: String,
  
    coApplicantName: String,
    coApplicantPhoto: String,
    coApplicantSignature: String,
    coApplicantDob: String,
    coApplicantAddress: String,
    coApplicantPan: String,
    coApplicantAadhaar: Number
  });
  
  studentSchema.plugin(passportLocalMongoose);

  module.exports = mongoose.model('Student', studentSchema);
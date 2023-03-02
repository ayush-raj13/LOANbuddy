const express = require('express');
const Student = require("../models/student");
const {studsignin, studsignup} = require('../controllers/authController');
const _ = require('lodash');

const router = express.Router({ mergeParams: true });

router.route("/studentlogin")
.get((req, res) => {
  res.render("studLogin");
})
.post(studsignin);

router.route("/studentregister")
.get((req, res) => {
  res.render("studRegister");
})
.post(studsignup);

router.route("/studenthome")
.get((req, res) => {
  if (req.isAuthenticated()){
    const reqUsername = req.user.username;
    Student.findOne({ username: reqUsername }, function (err, docs) {
      if (!err){
        if (docs && docs.userType === "student"){
          res.render("studHome");
        }else{
          res.redirect("/logout");
        }
      }
    });
    
  }else{
    res.redirect("/studentlogin");
  }
});

router.route("/studenthome/:state")
.get((req, res) => {
    if (req.isAuthenticated()){
        const reqUsername = req.user.username;
        Student.findOne({ username: reqUsername }, function (err, docs) {
          if (!err){
            if (docs && docs.userType === "student"){
              const state = _.upperCase(req.params.state);
              const applyUrl = `/studenthome/${req.params.state}/loanregister`
              console.log(docs.photo);
              res.render("studDashboard", {state: state, applyUrl: applyUrl, user: docs});
            }else{
              res.redirect("/logout");
            }
          }
        });
        
      }else{
        res.redirect("/studentlogin");
      }
});

router.route("/studenthome/:state/loanregister")
.get((req, res) => {
    if (req.isAuthenticated()){
        const reqUsername = req.user.username;
        Student.findOne({ username: reqUsername }, function (err, docs) {
          if (!err){
            if (docs && docs.userType === "student"){
              const postUrl = `/studenthome/${req.params.state}/loanregister`
              res.render("studLoanRegister", {postUrl: postUrl});
            }else{
              res.redirect("/logout");
            }
          }
        });
        
      }else{
        res.redirect("/studentlogin");
      }
})
.post((req, res) => {
  const studLoanApplicationData = {
    name: req.body.name,
    photo: req.body.studimgurl,
    signature: req.body.studsignatureurl,
    dob: req.body.dob.toString(),
    address: req.body.address,
    pan: req.body.pan,
    aadhaar: parseInt(req.body.aadhaar, 10),
    institute: req.body.institutename,
    bonafide: req.body.bonafideurl,
    feeStructure: req.body.feestructureurl,
    state: req.params.state,
    loanAmount: parseInt(req.body.loan, 10),
    loanStatus: 1,
    bank: req.body.bank,
  
    coApplicantName: req.body.applicantname,
    coApplicantPhoto: req.body.coappimgurl,
    coApplicantSignature: req.body.coappsignatureurl,
    coApplicantDob: req.body.applicantdob.toString(),
    coApplicantAddress: req.body.applicantaddress,
    coApplicantPan: req.body.applicantpan,
    coApplicantAadhaar: parseInt(req.body.applicantaadhaar, 10)
  };

  Student.findOneAndUpdate({username: req.user.username}, studLoanApplicationData, (err) => {
    if (err){
        res.send(err);
    }else{
        res.redirect(`/studenthome/${req.params.state}`);
    }
});
});

module.exports = router;
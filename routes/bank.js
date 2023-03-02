const express = require('express');
const Bank = require("../models/bank");
const Student = require("../models/student");
const { banksignin, banksignup } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route("/banklogin")
.get((req, res) => {
  res.render("bankLogin");
})
.post(banksignin);

router.route("/bankregister")
.get((req, res) => {
  res.render("bankRegister");
})
.post(banksignup);

router.route("/bankhome")
.get((req, res) => {
  if (req.isAuthenticated()){
    const reqUsername = req.user.username;
    Bank.findOne({ username: reqUsername }, function (err, docs) {
      if (!err){
        if (docs && docs.userType === "bank"){
          res.render("bankHome", {name: docs.name});
        }else{
          res.redirect("/logout");
        }
      }
    });
    
  }else{
    res.redirect("/banklogin");
  }
});

router.route("/bankhome/:status")
.get((req, res) => {
  Bank.findOne({ username: req.user.username }, function (err, docs) {
    if (!err){
        const loanStatus = (req.params.status === 'pending' && 1) || (req.params.status === 'approved' && 2) || (req.params.status === 'moneyacquired' && 3) || (req.params.status === 'moneyrepayed' && 4)
        Student.find({bank: docs.name, loanStatus: loanStatus}, (err, docs) => {
          res.render("bankDashboard", {userList: docs});
        });
      }else{
        console.log(err);
      }
  });
});

router.route("/bankcustomer/:username")
.get((req, res) => {
  const customerUsername = req.params.username;
  Student.findOne({username: customerUsername}, (err, student) => {
    if (!err){
      Bank.findOne({ username: req.user.username }, (error, bank) => {
        if (!error && bank) {
          if (req.isAuthenticated() && bank.userType === 'bank' && student.bank === bank.name){
            res.render("bankCustomer", {user: student});
          }
        }
      });
    }
  });
})
.post((req, res) => {
  const status = Number(req.body.status);
  Student.findOneAndUpdate({username: req.params.username}, {loanStatus: status}, (err, doc) => {
    if (!err) {
      console.log("Successfully updated the status");
      res.redirect(`/bankcustomer/${doc.username}`);
    } else {
      console.log(err);
    }
  });
});

module.exports = router;


const express = require('express');
const Gov = require("../models/government");
const Student = require("../models/student");
const { govsignin, govsignup } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route("/govlogin")
.get((req, res) => {
  res.render("govLogin");
})
.post(govsignin);

router.route("/govregister")
.get((req, res) => {
  res.render("govRegister");
})
.post(govsignup);

router.route("/govdashboard")
.get((req, res) => {
  if (req.isAuthenticated()){
    const reqUsername = req.user.username;
    Gov.findOne({ username: reqUsername }, function (err, docs) {
      if (!err){
        if (docs && docs.userType === "government"){
          Student.find({state: docs.jurisdiction}, (error, students) => {
            if (!error){
              res.render("govDashboard", {userList: students});
            }
          });
        }else{
          res.redirect("/logout");
        }
      }
    });
    
  }else{
    res.redirect("/govlogin");
  }
});

router.route("/govdashboard/:username")
.get((req, res) => {
  const customerUsername = req.params.username;
  Student.findOne({username: customerUsername}, (err, student) => {
    if (!err){
      res.render("govCustomer", {user: student});
    }
  });
});

module.exports = router;
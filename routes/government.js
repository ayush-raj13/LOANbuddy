const express = require('express');
const Gov = require("../models/government");
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
          res.render("govdashboard");
        }else{
          res.redirect("/logout");
        }
      }
    });
    
  }else{
    res.redirect("/govlogin");
  }
});

module.exports = router;
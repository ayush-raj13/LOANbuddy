const Student = require("../models/student");
const Bank = require("../models/bank");
const Gov = require("../models/government");
const passport = require('passport');

const studsignin = async (req, res) => {
  let location = true;
  Student.findOne({username: req.body.username}, function(err, docs){
    if(err) res.redirect("/studentlogin");
    if(docs.state && req.body.state.toLowerCase() === docs.state.toLowerCase()){
      console.log(req.body);
      Student.findOneAndUpdate({username: req.body.username}, {location: true}, (error, doc) => {
        if (!error) {
          console.log("Location successfully verified!");
        }
      });
      return;
    } else {
      console.log(req.body.state);
      Student.findOneAndUpdate({username: req.body.username}, {location: false, currentState: req.body.state}, (error, doc) => {
        if (!error) {
          console.log("User reallocated and address mismatch!");
        }
      });
    }
  });
    //From passport documentation
  const student = new Student({
    username: req.body.username,
    password: req.body.password
  });

  req.login(student, function(err) {
    if (err) { 
      console.log(err); 
      res.redirect("/studentlogin"); 
    }else{
        passport.authenticate("studentlocal")(req, res, () => {
            if (req.user.state){
                res.redirect(`/studenthome/${req.user.state}`);
            }else{
                res.redirect("/studenthome");
            }
      });
    }
    
  });
}

const studsignup = async (req, res) => {
    //From passport-local-mongoose documentation
  const newStudent = new Student({
    name: req.body.student,
    username: req.body.username,
    userType: "student",
    loanStatus: 0
  });
  Student.register(newStudent, req.body.password, function(err, user) {
    if (err) { 
      console.log(err);
      res.redirect("/studentregister");
    }else{
      passport.authenticate("studentlocal")(req, res, () => {
        res.redirect("/studenthome");
      });
    }
  });
}

const banksignin = async (req, res) => {
    //From passport documentation
  const bank = new Bank({
    username: req.body.username,
    password: req.body.password
  });

  req.login(bank, function(err) {
    if (err) { 
      console.log(err); 
      res.redirect("/banklogin"); 
    }else{
        passport.authenticate("banklocal")(req, res, () => {
        res.redirect("/bankhome");
      });
    }
    
  });
}

const banksignup = async (req, res) => {
     //From passport-local-mongoose documentation
  const newBank = new Bank({
    name: req.body.bank,
    username: req.body.username,
    userType: "bank",
    fund: 0
  });
  Bank.register(newBank, req.body.password, function(err, user) {
    if (err) { 
      console.log(err);
      res.redirect("/bankregister");
    }else{
      passport.authenticate("banklocal")(req, res, () => {
        res.redirect("/bankhome");
      });
    }
  });
}

const govsignin = async (req, res) => {
    //From passport documentation
  const gov = new Gov({
    username: req.body.username,
    password: req.body.password
  });

  req.login(gov, function(err) {
    if (err) { 
      console.log(err); 
      res.redirect("/govlogin"); 
    }else{
        passport.authenticate("govlocal")(req, res, () => {
        res.redirect("/govdashboard");
      });
    }
    
  });
}

const govsignup = async (req, res) => {
    //From passport-local-mongoose documentation
  const newGov = new Gov({
    username: req.body.username,
    userType: "government",
    jurisdiction: req.body.gov
  });
  Gov.register(newGov, req.body.password, function(err, user) {
    if (err) { 
      console.log(err);
      res.redirect("/govregister");
    }else{
      passport.authenticate("govlocal")(req, res, () => {
        res.redirect("/govdashboard");
      });
    }
  });
}

module.exports = { studsignin, studsignup, banksignin, banksignup, govsignin, govsignup}
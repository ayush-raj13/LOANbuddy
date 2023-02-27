require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport");
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const passportConfig = require('./config/passport');
const StudentRoutes = require("./routes/student");
const BankRoutes = require("./routes/bank");
const GovRoutes = require("./routes/government");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// design file
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

const url = process.env.MONGODB_URL;

//The code-snippet of 'Initializing Session' below should be at this place only
app.use(session({
  secret: process.env.SOME_LONG_UNGUESSABLE_STRING,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: url })
}));

app.use(passport.initialize());
app.use(passport.session());

//Connection to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(url);

passportConfig(passport);

// routers
app.get("/", (req, res) => {
  res.render("index");
});

app.use(StudentRoutes);
app.use(BankRoutes);
app.use(GovRoutes);

app.route("/logout")
.get((req, res) => {
  req.logout(function(err) {
    if (err) { console.log(err); }
    res.redirect('/');
  });
});

// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});

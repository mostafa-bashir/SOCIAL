const port = 8000;

// for database
require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
  }
);

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
// app.use('/public', express.static('public'));
// app.use('/post/public', express.static('public'));
// app.use('/profile/public', express.static('public'));

const path = require('path');
// app.use('/public', express.static(path.join(__dirname, 'public')));


const session = require('express-session');
const store = new session.MemoryStore();
app.use(session({
  secret: "dasd",
  store: store,
  resave: true, 
  saveUninitialized: true}));


app.set('view engine', 'ejs');

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  const isAuthRoute = ["/login", "/signup"].includes(req.path);

  if (!req.session.user) {
    if (isAuthRoute) {
      return next(); // Allow access to login or signup
    }
    return res.redirect("/login"); // Redirect to login if not authenticated
  }

  // If logged in, prevent access to login/signup and redirect to feed
  if (isAuthRoute) {
    return res.redirect("/feed");
  }

  next(); // Proceed to the intended route
};

// Apply middleware globally
app.use(requireAuth);


const splash = require('./APIs/splash/splash.js');
app.use("/", splash);

const signup = require('./APIs/auth/signup.js');
app.use("/signup", signup);

const login = require('./APIs/auth/login.js');
app.use("/login", login);

const logout = require('./APIs/splash/logout.js');
app.use("/logout", logout);

const feed = require('./APIs/feed/feed.js');
app.use("/feed", feed);

const create = require('./APIs/feed/create.js');
app.use("/create", create);

const post = require('./APIs/post/post');
app.use("/post", post);

const editProfile = require('./APIs/profile/editProfile.js');
app.use("/profile", editProfile);

const profile = require('./APIs/profile/profile.js');
app.use("/profile/:id", profile);

// Catch-all route for undefined routes
app.use((req, res, next) => {
  res.status(404).render('errors/404'); // Renders the 404.ejs page if no route matches
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// Database and Server packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Task = require("./models/task.js");
const User = require("./models/user.js");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
require("dotenv").config();

// Authentication packages
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8080;

const JWT_SECRET = process.env.JWT_SECRET; // secret key for jwt

app.set("view engine", "ejs");  // setting view engine to ejs
app.set("views", path.join(__dirname, "views"));  // setting path of views folder
app.engine("ejs", ejsMate);  // defining ejs-mate as the template engine for ejs
app.use(express.static(path.join(__dirname, "public")));  // setting path of public folder
app.use(express.urlencoded({extended: true}));  // to parse the body of the request
app.use(express.json());  // to parse json data
app.use(methodOverride("_method"));  // to use method-override for DELETE and PUT requests

// middleware to parse cookies
app.use(cookieParser());

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database");
    }
    catch (error) {
        console.log("Some error while connecting to database");
        console.log(error);
    }
}  // function to connect to database
connect();

app.listen(port, () => {
    console.log("Server is listening on port", port);
})

// middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect("/login");
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // storing user info in req
        next();
    }
    catch (error) {
        return res.redirect("/login");
    }
};

// middleware to make currentPath available in all templates
app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

// CRUD Operations For Tasks

// index route
app.get("/tasks", isLoggedIn, async (req, res) => {
    try {
        const allTasks = await Task.find({ user: req.user.id });
        res.render("tasks/index.ejs", {allTasks});
    }
    catch (error) {
        console.log(error);
        res.send("Some error in database");
    }
})

// new route
app.get("/tasks/new", isLoggedIn, (req, res) => {
    res.render("tasks/new.ejs");
})

// create route
app.post("/tasks", isLoggedIn, async (req, res) => {
    let {title, description, status} = req.body;
    try {
        // if no data provided, redirect to new task form
        if (!title && !description && !status) {
            return res.redirect("/tasks/new");
        }
        const newData = await Task.insertOne({title, description, status: status.toLowerCase(), user: req.user.id});
        console.log(newData);
        res.redirect("/tasks");
    }
    catch (error) {
        console.log(error);
        res.send("Some error in database");
    }
})

// delete route
app.delete("/tasks/:id", isLoggedIn, async (req, res) => {
    let {id} = req.params;
    try {
        let deleteTask = await Task.findOneAndDelete({_id: id, user: req.user.id });
        console.log(deleteTask);
        res.redirect("/tasks");
    }
    catch (error) {
        console.log(error);
        res.send("Some error in database");
    }
})

// edit route
app.get("/tasks/:id/edit", isLoggedIn, async (req, res) => {
    let {id} = req.params;
    try {
        let oldData = await Task.findOne({_id: id, user: req.user.id });
        if (!oldData) return res.redirect("/tasks");  // if no task found, redirect to index
        console.log(oldData);
        res.render("tasks/edit.ejs", {oldData});
    }
    catch (error) {
        console.log(error);
        res.send("Some error in database");
    }
})

// update route
app.put("/tasks/:id", isLoggedIn, async (req, res) => {
    let {id} = req.params;
    let {title, description, status} = req.body;
    try {
        let newData = await Task.findOneAndUpdate({_id: id, user: req.user.id }, {title, description, status: status.toLowerCase()}, {runValidators: true, new:true});
        if (!newData) return res.redirect("/tasks");  // if data not updated, redirect to index
        console.log(newData);
        res.redirect("/tasks");
    }
    catch (error) {
        console.log(error);
        res.send("Some error in database");
    }
})

// Authentication Routes

// signup page
app.get("/signup", (req, res) => {
    res.render("auth/signup.ejs");
});

// signup logic
app.post("/signup", async (req, res) => {
    let { username, email, password } = req.body;
    try {
        // check if email already exists
        let existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.send("Email already exists");
        }
        // check if username already exists
        let existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.send("Username already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10); // hashing password
        const newUser = await User.insertOne({
            username,
            email,
            password: hashedPassword
        });
        console.log(newUser);
        res.redirect("/login");
    }
    catch (error) {
        console.log(error);
        res.send("Error while signing up");
    }
});

// login page
app.get("/login", (req, res) => {
    res.render("auth/login.ejs");
});

// login logic
app.post("/login", async (req, res) => {
    let {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.send("Invalid credentials");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send("Invalid credentials");
        }

        // creating token
        const token = jwt.sign(
            {id: user._id, username: user.username},
            JWT_SECRET,
            {expiresIn: "1d"}
        );

        // storing token in cookie
        res.cookie("token", token, {httpOnly: true});
        res.redirect("/tasks");
    }
    catch (error) {
        console.log(error);
        res.send("Error while logging in");
    }
});

// logout route
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

// root route
app.get("/", (req, res) => {
    res.redirect("/signup");
});
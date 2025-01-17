require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const blog = require("./models/blog");

mongoose.connect(process.env.MONGO_URL).then((err) => { //"mongodb://127.0.0.1:27017/blogify"
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

app.use(express.urlencoded({extended: false})); //for handling form data this middleware is required

app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

app.get("/", async(req, res) => {
    const allBlogs = await blog.find({}).sort
    ({createdAt: -1});
    res.render("home", {user: req.user, blogs: allBlogs});
});

app.use("/user", userRoute);

app.use(express.static(path.resolve("./public"))); //to use public folder 

app.use("/blog", blogRoute);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
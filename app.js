const express = require("express");
const path = require("path");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");
//const encoder = bodyParser.urlencoded();
// const dotenv = require("dotenv");
const { engine } = require("express/lib/application");
app.use(express.json());
app.use(bodyParser.json());
// dotenv.config({ path: "./env" });
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
//console.log("process.env: ", process.env);
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "asset_tokenization",
});
//app.use(bo)
//app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res)=>{
  console.log('i ve been called')
  res.send("paths are working");
})

app.post("/signup", (req, res)=>{
  console.log(req.body);
  res.status(201).json({message:"successfully added"});
})

app.post("/login", (req, res)=>{
  console.log(req.body);
  res.status(201).json({message:"successfully login"});
})

const authenticationRoute = require("./Auth/authentication");
app.use("/auth", authenticationRoute);

const PostRoute = require("./modules/post");
app.use("/post", PostRoute);

const publicDirectory = path.join(__dirname, "./public ");
app.use(express.static(publicDirectory));

app.set("view engine", "hbs");
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MYSQL Connected....");
  }
});

app.get("/", (req, res) => {
  //res.send("<h1>Home Page</h1>")
  res.render("index");
});

app.listen(5000, () => {
  console.log("Server Started on Port 5000");
});

app.listen(5001, () => {
  console.log("Signup Page Starts");
});

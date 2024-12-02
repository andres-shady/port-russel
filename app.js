const express = require ('express');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors  = require("cors");
const indexRouter = require("./routes/index");
const dashboardRouter = require("./routes/dashboard");
const Mongodb     = require("./db/mongo");

Mongodb.DbConnect();

const app = express();
port = 5000
app.listen(port,()=>{
    console.log('bienvenue')
})

app.use(cors({
    exposedHeaders: ['Authorization'],
    origin:"*"
}))

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use('/dashboard', dashboardRouter);


app.use(function(req,res,next){
    res.status(400).json({name: "port",version:'"0.0.0"',status:404 , message: "not found"});
})


app.set("view",path.join(__dirname,"views"))
app.set ("view engine", "ejs")

app.get("/",(req,res) =>{
 res.send("hello world")
})


module.exports = app;

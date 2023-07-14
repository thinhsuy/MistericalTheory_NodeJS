//
var express = require('express');
var app = express()

//
app.set('view engine', 'pug'); 
app.set('views','./views');     
app.use(express.static('public'));

//
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

//
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//
var session = require('express-session');
app.use(session({secret: "Shh, its a secret!", resave:true, saveUninitialized: true}));

//
app.all('/', function(req, res){
    res.render("home");
});

app.all('/user', function(req, res){
    res.send("Hello user");
});

app.all('/nmv', function(reg, res){res.render("top1");});
app.all('/dmt', function(reg, res){res.render("top2");});
app.all('/nnq', function(reg, res){res.render("top3");});

//
app.get('/form', function(req, res){res.render("form");});
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.post('/form', function(req, res){
    console.log(req.body);
    res.send("recieved your request!");
});

//
app.all('/', function(req, res){
    //set name=express with expire time is 36000ms
    res.cookie('name', 'express', {expire: 36000 + Date.now()}).res.render("home");
})

//
app.get('/session', function(req, res){
    if(req.session.page_views){
       req.session.page_views++;
       res.send("You visited this page " + req.session.page_views + " times");
    } else {
       req.session.page_views = 1;
       res.send("Welcome to this page for the first time!");
    }
});

app.all('*', function(reg, res){
    res.send("This URL is not found"); 
})

app.listen(3000);

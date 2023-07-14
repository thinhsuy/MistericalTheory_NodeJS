/*EXPRESS INCLUDE*/
var express = require('express');
var app = express()
/*FORM INCLUDE*/
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
/*COOKIE INCLUDE*/
var cookieParser = require('cookie-parser');
app.use(cookieParser());
/*PUG INCLUDE*/
app.set('view engine', 'pug');  //set engine pug
app.set('views','./views');     //create file view
app.use(express.static('public'));  //take the address file
/*SESSION INCLUDE*/
var session = require('express-session');
app.use(session({secret: "Shh, its a secret!"}));


app.get('/', function(req, res){    // "/" is default http
    res.send("Hello World");        //res.send() = console.write()    
});

app.get('/home', function(req, res){   // localhost:3000/home    
    res.send("Home");         
});

// app.post('/post', function(req, res){   // POST require condition before join in page   
//     res.send("this is post");         
// });

//require id[from 0 - 9][with 4 elements]
app.all('/:id([0-9]{4})/:name', function(req, res){   // localhost:3000/123 => This is my id 123  
    res.send("My id is " + req.params.id + " and my name is " + req.params.name);         
});

//render html from file.pug
app.get('/pug', function(req, res){   // localhost:3000/home    
    res.render("home");         
});

//default reject url
app.all('*', function(req, res){   
    res.send("This URL is not found");         
});


app.get('/form', function(req, res){
    res.render("form");         
});
// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
// for parsing multipart/form-data
app.use(upload.array()); 
app.post('form', function(req, res){
    console.log(req.body);  //reg.body to take out formed
    if (req.body.say == "Hi") res.send("recieved your request!");    //reg.body.name == value, with name of input and value of input
    else res.send("Uncorrected")
});

//set name=express with expire time is 36000ms
app.get('/', function(req, res){
    res.cookie('name', 'express', {expire: 36000 + Date.now()}).res.render("form");         
});
app.get('/', function(req, res){
    res.send(req.cookie.name);
    res.clearCookie('name');
});

//SESSION as same as coockie but save data at sever instead of client
app.get('/', function(req, res){
    if(req.session.page_views){
       req.session.page_views++;
       res.send("You visited this page " + req.session.page_views + " times");
    } else {
       req.session.page_views = 1;
       res.send("Welcome to this page for the first time!");
    }
 });

//set the localhost
app.listen(3000);

/*cookie and body parsern
var bodyParser = require('body-parser');
//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))
//To parse json data
app.use(bodyParser.json())
var cookieParser = require('cookie-parser');
app.use(cookieParser())
*/
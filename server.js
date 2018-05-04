var express = require("express");// require express
var path = require("path");//The path module provides utilities for working with file and directory paths. It can be accessed using:
var app = express(); // create the express app
var bodyParser = require('body-parser'); //require body-parser
var session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true })); // use it!
app.use(express.static(path.join(__dirname, "./static")));// static content
app.set('views', path.join(__dirname, './views')); // setting up ejs and our views folder
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secretsessionkey',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

app.get('/', function(req, res) { // root route to render the index.ejs view
    if(req.session.count){
       req.session.count++;

    }else{
        req.session.count = 0;
    }
res.render("index.ejs", {counter:req.session.count});
})

app.post('/increaseCount', function(req, res) { // root route to render the index.ejs view
    req.session.count++;     
res.redirect("/");
})

app.post('/resetCount', function(req, res) { // root route to render the index.ejs view
    req.session.destroy();     
res.redirect("/");
})

app.listen(8000, function() { // tell the express app to listen on port 8000
 console.log("listening on port 8000");
});

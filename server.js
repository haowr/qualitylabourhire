var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path')
var router =  express.Router();
var appRoute = require('./app/routes.js')(router);
var mongoose = require('mongoose');
//var config = require('./config');

var database = require('./config/database');
var port = process.env.PORT || 8081;

mongoose.connect(database.url, function(err){
    if(err){
        console.log("Not connected to the database: " +err)
    }else{
        console.log("Successfully connected to Mlab/MongoDb @ "+database.url)
    }
})
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());   
app.use('/api',appRoute)
app.get('*', function (req, res) {

    res.sendFile(path.join(__dirname + '/public/views/index.html')); // this might need to be lower than the routes..
});
//require('./app/routes.js')(app);
app.listen(port);
console.log("App listening on port : " + port);
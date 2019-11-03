var config = require('../bin/config.json');
var controller = require('./controller');
var express = require('express');
var app = express();


app.get("/", function(req, res){
    res.sendFile("./www/home.html");
});

app.get("/set", function(req, res){
    controller.
});

app.get("/get", function(req, res){
    var json = {
        water: process.env.water_status,
        lights: process.env.lights_status,
        propane: process.env.propane_status
    };

    res.end(JSON.stringify(json));
});

app.listen(config.express.port);
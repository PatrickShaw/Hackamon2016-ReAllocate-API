/**
 * @author Patrick Shaw (Patrick.Leong.Shaw@gmail.com)
 * @date 14/10/2016
 */
const request = require('request');
const express = require('express');
const mongoose = require("mongoose");

const app = express();
const reactExpress = require('express-react-views');

// view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactExpress.createEngine({presets: ['react', 'es2015']}));
app.use(express.static(__dirname + "/reports"));

// make/connect to db
mongoose.connect('mongodb://localhost/reAllocate');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // connected
    console.log("connected to reAllocate db");
});


app.get('/', function(req, res) {
    res.render("index",{});
});



Unit = require('./models/unit');

// db tests 
app.get('/testADDdb', function(req, res) {

    console.log("test adding to db");
    var unit = {
        uuid: "abcd",
        title: "Software Engineering",
        code: "FIT3029",
        classes: ["No"],
        required: ["Nothing"]
    };
    
    Unit.testAddUnit(unit, function(err, unit){
        if (err){
            console.log("Error: " + err + " - " + unit);
            throw err
        } else {
            console.log("Added " + unit);
            res.json(unit);
        }
    });
});

app.get('/testSEEdb', function(req, res) {
    // shows everything in db
    console.log("Showing all entries in db")
    Unit.find(function(err, units) {
        if (err) {
            return console.error(err);
        }
        console.log(units);
    });
});

app.get('/testREMOVEdb', function(req, res){
    // remove everything in Unit model
    console.log("Removing db")
    Unit.remove({}, function(err) {
        console.log('collection removed')
    });
     
});

const server = app.listen(3000);

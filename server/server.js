const request = require('request');
const express = require('express');
const mongoose = require("mongoose");

const isNumeric = require("server/util/is_numeric");

const app = express();
const server = app.listen(3000);
const reactExpress = require('express-react-views');

// view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactExpress.createEngine({presets: ['react', 'es2015']}));
app.use(express.static(__dirname + "/reports"));

//
app.get('/students/:int(\\d+)', function(req, res){
    // Get user info based on the user id.

});
function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

function sendError(req, res, errorMessage) {
    assert(200 <= res.status <= 299, "Sending error but sending with a success status type (2xx).");
    res.send({
        message: errorMessage
    });
}


app.get('/students/:studentId/units/:unitId', function(req, res) {
    var studentId = req.params.studentId;
    var unitId = req.params.unitId;
    if(!isNumeric(studentId)) {
        res.status(400);
        sendError(req, res, "Invalid unitId.")
    } else if(!isNumeric(studentId)) {
        res.status(400);
        sendError(req, res, "Invalid studentId.");
    }
    // TODO: David is a poo poo
});

app.get('/units/:unitId', function(req, res) {
    var unitId = req.unitId;
    if(!isNumeric(unitId)) {
        res.status(400);
        sendError(req, res, "Invalid unitId.");
    }
    // TODO: Liam is such poo poo
});

app.get('/students/:int(\\d+)', function(req, res) {

});

app.post('/swap', function(req, res) {

});
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


const request = require('request');
const express = require('express');
const mongoose = require('mongoose');

const Unit = require('./models/unit');
const Student = require('./models/student');
const Class = require('./models/class');

const isNumeric = require("./util/is_numeric");

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

app.get('/students/:studentUuid/units/:unitUuid', function(req, res) {
    var studentUuid = req.params.studentUuid;
    var unitUuid = req.params.unitUuid;
    if(!isNumeric(studentUuid)) {
        res.status(400);
        sendError(req, res, "Invalid unitId.")
    } else if(!isNumeric(unitUuid)) {
        res.status(400);
        sendError(req, res, "Invalid studentId.");
    }
    var unit = Unit.findOne({'uuid' : unitUuid });
    console.log(unit);
});
app.get('/units/:unitUuid', function(req, res) {
    var unitUuid = req.params.unitUuid;
    if(!isNumeric(unitUuid)) {
        res.status(400);
        sendError(req, res, "Invalid unitId.");
    }
    // TODO: Liam is such poo poo
});

app.get('/students/:studentUuId', function(req, res) {
    var studentUuid = req.params.studentUuid;
    if(!isNumeric(studentUuid)) {
        res.status(400);
    }
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


app.get('/testmail', function(req, res) {
    var mailer = require("./util/mailer");
    var recipientEmail = "dlei7@student.monash.edu";
    var swappedIntoClass =  {
        uuid: "trashboat",
        time: "6:00 am",
        location: "Monash Clayton, Eng labs",
        type: "Lecture",
        unitCode: "FIT1337"
    };
    mailer.sendSuccessEmail(recipientEmail, swappedIntoClass);
    console.log("Send mail =]")
});
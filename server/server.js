const request = require('request');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const Unit = require('./models/unit');
const Student = require('./models/student');
const Class = require('./models/class');

const isNumeric = require("./util/is_numeric");

const app = express();
const server = app.listen(3000);

const reactExpress = require('express-react-views');

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

// view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactExpress.createEngine({presets: ['react', 'es2015']}));
app.use(express.static(__dirname + "/reports"));

// ------------------------- >>> Rest API <<< ---------------------------
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
    res.send(unit);
    console.log(unit);
});

// get a unit's information
app.get('/units/:unitUuid', function(req, res) {
    var unitUuid = req.params.unitUuid;
    console.log("check /units/:unitUuid - " + unitUuid);
    Unit.findUnit(unitUuid, function(err, obj) {
        if ((err) || (obj === null)) {
            console.log("Error at /units/:unitUuid, err: " + err + ", obj: " + obj );
        } else {
            console.log("Passed - /units/:unitUuid, err: " + err + ", obj: " + obj );
        }

        res.send(JSON.stringify(obj));
    });
});

// /dev add a unit 
app.post('/dev/units/add', function(req, res) {
    var testUnit = {
        uuid: "abcd",
        title: "Software Engineering",
        code: "FIT3029",
        classes: ["No"],
        required: ["Nothing"]
    };

    Unit.addUnit(testUnit, function(err, unit){
        if (err){
            console.log("Error: " + err + " - " + unit);
            throw err
        } else {
            console.log("Added " + unit);
            res.json(unit);
        }
    });
});

// /dev add a student
app.post('/dev/student/add', function(req, res) {
    var testStudent = {
        uuid: "gtfo",
        firstname: "sponge",
        lastname: "bob",
        username: "squid",
        password: "ward",
        units: ["FIT1010", "FIT3080", "FIT1000", "FIT4009"],
        classes: ["Being a sponge", "Sponging", "Absorbing water", "Fluid Dynamics"]
    };
    
    Student.addStudent(testStudent, function(err, stu){
        if (err){
            console.log("Error: " + err + " - " + stu);
        } else {
            console.log("Added " + stu);
            res.json(stu);
        }
    })
});

// authenticate a student via username and password
app.post('/login', function(req, res) {
    
    var jsonBody = req.body;
    console.log("json body: " + jsonBody);
    var studentUsername = jsonBody.username;
    var studentPassword = jsonBody.password;
    
    console.log("check /login - body: " + jsonBody + ", username: " + studentUsername +  ", password: " + studentPassword);
    
    Student.authStudent(studentUsername, studentPassword, function(obj, err) {
        if ((err) || (obj === null)) {
            console.log("Error at /login, err: " + err + ", obj: " + obj );
        } else {
            console.log("Passed - /login, err: " + err + ", obj: " + obj );
        }

        res.send(JSON.stringify(obj));
    })
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

// Tests
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
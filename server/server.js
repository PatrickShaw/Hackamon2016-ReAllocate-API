/**
 * @author Patrick Shaw (Patrick.Leong.Shaw@gmail.com)
 * @date 14/10/2016
 */
const request = require('request');
const express = require('express');
const mongoose = require("mongoose");

const app = express();
const server = app.listen(3000);
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

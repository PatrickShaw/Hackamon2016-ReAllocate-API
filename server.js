/**
 * @author Patrick Shaw (Patrick.Leong.Shaw@gmail.com)
 * @date 14/10/2016
 */
const request = require('request');
const express = require('express');
const app = express();
const server = app.listen(3000);
const reactExpress = require('express-react-views');
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactExpress.createEngine({presets: ['react', 'es2015']}));
app.use(express.static(__dirname + "/reports"));
app.get('/', function(req, res) {
    res.render("index",{});
});

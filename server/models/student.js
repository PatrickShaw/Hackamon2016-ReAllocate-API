var mongoose = require("mongoose");

var studentSchema = mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    username: {
            type: String,
            required: true
    },
    password: {
        type: String,
        required: true
    },
    units: {
        type: Array,
        required: true
    },
    classes: {
        type: Array,
        required: true
    }
    
});


var Student = module.exports = mongoose.model('Student', studentSchema);

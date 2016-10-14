var mongoose = require("mongoose");

var classSchema = mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String, 
        required: true
    },
    type: {
        // can be lecture, tutorial, lab etc
        type: String,
        required: true
    }
});

var Class = module.exports = mongoose.model('Class', classSchema);


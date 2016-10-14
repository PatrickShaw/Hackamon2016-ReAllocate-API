var mongoose = require("mongoose");

var classSchema = mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
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
    },
    unitCode: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    noStudents: {
        type: Number,
        required: true
    },
    swappable: {
        type: Boolean,
        required: true
    }
});

var Class = module.exports = mongoose.model('Class', classSchema);


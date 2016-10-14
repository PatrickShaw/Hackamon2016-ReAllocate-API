var mongoose = require("mongoose");

var unitSchema = mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    classes: {
        type: Array,
        required: true
    },
    required: {
        type: Array,
        required: true
    }
});

var Unit = module.exports = mongoose.model('Unit', unitSchema);

// add unit
module.exports.addUnit = function(unit, callback){
    Unit.create(unit, callback);
};

// find unit
module.exports.findUnit = function(uuid, callback){
    Unit.findOne({"uuid":uuid}, callback);
};



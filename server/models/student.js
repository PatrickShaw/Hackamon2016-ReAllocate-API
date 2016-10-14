var mongoose = require("mongoose");

var studentSchema = mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
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
    classes: {              // array of class uuid's
        type: Array,
        required: true
    }
    
});


var Student = module.exports = mongoose.model('Student', studentSchema);

// add student
module.exports.addStudent = function(student, callback){
    Student.create(student, callback);
};

// auth student by username and password 
module.exports.authStudent = function(studentUsername, studentPassword, callback){
    Student.find({"username":studentUsername, "password":studentPassword}, callback);
};


// get student details by uuid
module.exports.getStudentByUuid = function(studentUuid, callback) {
    Student.find({"uuid":studentUuid}, callback)
};
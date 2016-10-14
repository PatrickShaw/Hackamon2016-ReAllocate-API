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
    unitUuid: {
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
    },
    fifoQueue: {
        type: Array,
        required: true
        // array of json objects with studentuuid and date
    }
});

var Class = module.exports = mongoose.model('Class', classSchema);

module.exports.serveClassQueue = function (unitClass, callback) {
    //fifo queue
    if (unitClass.length > 0) {

        //unitClass.fifoQueue.find({}, {"sort" : ['datetime', 'asc']} ).toArray(function(err,entry) {}); // should just sort it

        var minTime = null;
        var minEntryIdx = null;

        for (var i = 0; i < unitClass.fifoQueue.length; i ++) {
            if (minTime === null) {
                minTime = unitClass.fifoQueue[i].datetime;
                minEntryIdx = i;
            } else {
                if (unitClass.fifoQueue[i].datetime < minTime) {
                    minTime = unitClass.fifoQueue[i].datetime;
                    minEntryIdx = i;
                }
            }
        }

        var firstEntry = unitClass.fifoQueue[minEntryIdx];
        if (firstEntry === null) {
            console.log("Error at .fifoQueue, entry stuid: " + firstEntry.studentUuid + ", entry: " + firstEntry);
            return false;
        } else {
            console.log("Served .fifoQueue, entry stuid: " + firstEntry.studentUuid + ", entry: " + firstEntry);
            if (minEntryIdx > -1) {
                unitClass.fifoQueue = unitClass.fifoQueue.splice(index, 1);     // remove item from queue
            }
            return firstEntry;                                                  // next student to add to queue
        }


    } else {
        console.log("Error at .fifoQueue, error: Queue empty");
    }
};

module.exports.appendClassQueue = function (unitClass, studentUuid, callback) {
    +new Date;
    var timestamp = Date.now();
    var entry = {
        "studentUuid": studentUuid,
        "datetime": timestamp

    };
    
    unitClass.fifoQueue.push(entry);
    console.log("added to class " + unitClass + " queue")
};

module.exports.getClassByUuid = function (classUuid, callback){
    Class.find({"uuid":classUuid}, callback)
};

module.exports.getAllClasses = function(){
    Class.find({}, function(err, classes) {
        var classMap = {};

        classes.forEach(function(unitClass) {
            classMap[unitClass.uuid] = unitClass;
            console.log("uuid: " + unitClass.uuid + ", q: " + unitClass.fifoQueue)
        });

        return classMap;
    });
};


// add class
module.exports.addClass = function(aClass, callback){
    Class.create(aClass, callback);
};
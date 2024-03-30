const mongoose = require('mongoose');

const { Schema } = mongoose;


const dataPoint = new Schema({
    topic: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    scriptureText: {
        type: String,
        required: true
    }

});

const dataPoints = mongoose.model('dataPoints', dataPoint);

module.exports = dataPoints;
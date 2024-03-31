const mongoose = require('mongoose');

const { Schema } = mongoose;


const dataPoint = new Schema({
    concept: {
        type: String,
        required: true
    },
    references: [{type: Schema.Types.ObjectId, ref: 'references'}]

});

const dataPoints = mongoose.model('dataPoints', dataPoint);

module.exports = dataPoints;
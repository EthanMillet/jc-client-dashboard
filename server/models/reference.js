const mongoose = require('mongoose');

const { Schema } = mongoose;


const reference = new Schema({
    reference: {
        type: String,
        required: true
    },
    scriptureLink: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    conceptID: {type: Schema.Types.ObjectID, ref: 'dataPoints'}

});

const references = mongoose.model('references', reference);

module.exports = references;
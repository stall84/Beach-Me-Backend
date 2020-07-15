const mongoose = require('mongoose');

const BeachSchema = new mongoose.Schema({
    beachName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 50
    },
    state: {
        type: String,
        required: true,
        maxLength: 2
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    }
});

module.exports = mongoose.model('Beaches', BeachSchema);
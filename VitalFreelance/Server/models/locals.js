const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const File = require("./gridFS");

const localSchema = new Schema({
    title: {
        type: String,
        required: true, // corrected "require" to "required"
    },
    description: {
        type: String,
        required: true, // corrected "require" to "required"
    },
    Image: [{
        type: Schema.Types.ObjectId,
        ref: 'File',
        required: true, // corrected "require" to "required"
    }],
    zona_trabajo: {
        type: {
            lat: Number,
            lng: Number
        },
        required: true, // corrected "require" to "required"
    },
    ocupacion: {
        type: String,
        required: true, // corrected "require" to "required"
    }
});

module.exports = mongoose.model("Local", localSchema);

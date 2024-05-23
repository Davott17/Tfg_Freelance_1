const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;


// fieldname: 'Image',
//   originalname: 'avatar.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'uploads/',
//   filename: 'Image-1716500468445.jpg',
//   path: 'uploads\\Image-1716500468445.jpg',
//   size: 4623


const FileSchema = new Schema({
    fieldname: {
        type: String,
        require: true,
    },
    originalname: {
        type: String,
        require: true,
    },
    encoding: {
        type: String,
        require: true,
    },

    mimetype: {
        type: String,
        require: true,
    },

    destination: {
        type: String,
        require: true,
    },

    filename: {
        type: String,
        require: true,
    },

    path: {
        type: String,
        require: true,
    },

    size: {
        type: Number,
        require: true,
    },

});

module.exports = mongoose.model('File', FileSchema);
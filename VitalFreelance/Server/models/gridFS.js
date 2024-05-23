const mongoose = require('mongoose');
const {type} = require('os');
const Schema = mongoose.Schema;


const FileSchema = new Schema({
    filename: String,
    contentType: String,
    length: Number,
    chunkSize: Number,
    uploadDate: Date,
    aliases: [String],
    metadata: Schema.Types.Mixed,
});

module.exports = mongoose.model('File', FileSchema);
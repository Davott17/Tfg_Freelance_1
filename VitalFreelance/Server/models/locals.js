const mongoose = require('mongoose');
const {type} = require('os');
const Schema = mongoose.Schema;


const localSchema = Schema({
    title:{
        type: String,
        require:true,
        
    },
    description:{
        type: String,
        require:true,
    },
    image:{
        type: Schema.Types.ObjectId,
        ref: 'File',
        require:true,
    },
    zona_trabajo:{
        type: String,
        require:true,
    },
    ocupacion:{
        type: String,
        require:true,
    }


});

module.exports = mongoose.model("Local", localSchema);
const mongoose = require('mongoose');
const {type} = require('os');
const Schema = mongoose.Schema;
const File = require("./gridFS");


const OferSchema = Schema({
    title:{
        type: String,
        require:true,
        
    },
    description:{
        type: String,
        require:true,
    },
    Image: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    zona_trabajo:{
        type: String,
        require:true,
    },
    ocupacion:{
        type: String,
        require:true,
    },
    email:{
        type: String,
        require:false,
    }


});



module.exports = mongoose.model("Oferta", OferSchema);
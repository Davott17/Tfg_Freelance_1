const mongoose = require('mongoose');
const {type} = require('os');
const Schema = mongoose.Schema;


const UserSchema = Schema({
    usuario:{
        type: String,
        require:true,
        unique:true,
    },
    name:{
        type: String,
        require:true,
    },
    lastname: {
        type: String,
        require:true,
    },
    email:{
        type: String,
        require:true,
        unique:true,
    },
    tel:{
        type: Number, 
        require: true,
    },
    password:{
        type: String,
        require:true,
    },
    n_empresa:{
        type: String,
        require:false,
    },
    trabajo:{
        type: String,
        require:false,
    },
    avatar:{
        type: String,
        require:false,
    }
});


module.exports = mongoose.model("Usuario", UserSchema);
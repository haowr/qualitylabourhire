var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');
var bcrypt = require('bcryptjs');

var ClientSchema = new Schema({

   
    name: {type:String,  required: true,dropDups:true},
    
 





})

//var Model = mongoose.model('User', UserSchema);
module.exports = mongoose.model('Client', ClientSchema);

var Client = mongoose.model('Client', ClientSchema);
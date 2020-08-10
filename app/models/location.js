var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');
var bcrypt = require('bcryptjs');

var LocationSchema = new Schema({

   
    name: {type:String,  required: true,dropDups:true}
 





})

//var Model = mongoose.model('User', UserSchema);
module.exports = mongoose.model('Location', LocationSchema);

var Location = mongoose.model('Location', LocationSchema);
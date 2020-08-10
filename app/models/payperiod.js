var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');
var bcrypt = require('bcryptjs');

var PayPeriodSchema = new Schema({

   
    payperiodnum: {type:Number,  required: true,dropDups:true},
    currentuser:{type:String},
    jobDetails:{type:Array, required: true},
    monthName:{type:String},
    month:{type:Number},
    booked:{type:Boolean},
    day:{type:String},
    date:{type:Number}





})

//var Model = mongoose.model('User', UserSchema);
module.exports = mongoose.model('PayPeriod', PayPeriodSchema);

var PayPeriod = mongoose.model('PayPeriod', PayPeriodSchema);
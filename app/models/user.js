var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({

    name: {type: String, required: true},
    username: {type:String, lowercase: true, required: true, unique:true,dropDups:true},
    password:{type:String, required:true, select:false},
    email:{type:String, required: true, lowercase:true, unique:true, dropDups:true},
    payperiodnum:{type:Number},
    payrate:{type:Number},
    delinquenttimesheets:{type:Array},
    historyupdated:{type:Boolean},
    phonenumber:{type:Number},
    payperiodhistory:{type:Array},
    comments:{type:Array},
    complaints:{type:Array},
    userclass:{type:String},
    active:{type:Boolean,required: false, default: false},
    temporarytoken: {type:String, required: false},
    resettoken:{type:String, required:false, default:'user'},
    //viewhistory:{type:Array},
    payperiods:{type:Array},
    //alreadyapplied:{type:Array},
    //calender:{type:Object},
    //June:{type:Array},
    jobDetails:{type:Array},
    supervisors:{type:Array},
    requestedjobs:{type:Array},
    approvedjobs:{type:Array},
    approvednotbooked:{type:Array},
    locations:{type:Array},
    submittedtimesheets:{type:Array},
    disputedtimesheets:{type:Array},
    jobcount:{type:Array},
    reqjobcount:{type:Array}




})

UserSchema.pre('save', function(next){
    var user = this;
    console.log('user Prehook',user.password) 
    console.log(typeof user.password)
    //var password = user.password.toString()
   if(!user.isModified('password')) return next();

  bcrypt.hash(user.password,null,null,function(err,hash){
        if(err) return next(err);
        user.password = hash;
        next();
       
       
    })
})
//CREATE CUSTOM METHOD
UserSchema.methods.comparePassword = function(password){
    console.log("oy")
    console.log(password, this.password)
    console.log(typeof password)
    var passwordPlain = password.toString()
    return bcrypt.compareSync(password,this.password);

}
//var Model = mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);

var User = mongoose.model('User', UserSchema);
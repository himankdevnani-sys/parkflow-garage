const mongoose=require('mongoose');
module.exports=mongoose.model('GarageSettings',new mongoose.Schema({garageName:{type:String,default:'City Centre Garage'},firstHourRate:{type:Number,default:100,min:0},additionalHourRate:{type:Number,default:60,min:0},dailyCap:{type:Number,default:500,min:0}},{timestamps:true}));

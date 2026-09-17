const mongoose=require('mongoose');
const rateSchema=new mongoose.Schema({firstHourRate:{type:Number,required:true,min:0},additionalHourRate:{type:Number,required:true,min:0},dailyCap:{type:Number,required:true,min:0}},{_id:false});
module.exports=mongoose.model('GarageSettings',new mongoose.Schema({garageName:{type:String,default:'City Centre Garage'},firstHourRate:{type:Number,default:100,min:0},additionalHourRate:{type:Number,default:60,min:0},dailyCap:{type:Number,default:500,min:0},rateCard:{compact:rateSchema,standard:rateSchema,ev:rateSchema}},{timestamps:true}));

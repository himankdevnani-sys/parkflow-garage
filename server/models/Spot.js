const mongoose=require('mongoose');
const schema=new mongoose.Schema({spotNumber:{type:String,required:true,unique:true,uppercase:true,trim:true},level:{type:Number,required:true},type:{type:String,enum:['compact','standard','ev'],required:true},hasCharger:{type:Boolean,default:false},status:{type:String,enum:['available','occupied'],default:'available'},currentVisit:{type:mongoose.Schema.Types.ObjectId,ref:'ParkingVisit',default:null}},{timestamps:true});
schema.pre('validate',function(){if(this.type==='ev')this.hasCharger=true});
module.exports=mongoose.model('Spot',schema);

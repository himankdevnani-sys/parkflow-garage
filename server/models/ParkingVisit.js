const mongoose=require('mongoose');
const schema=new mongoose.Schema({plateNumber:{type:String,required:true,uppercase:true,trim:true},vehicleType:{type:String,enum:['compact','standard','ev'],required:true},spot:{type:mongoose.Schema.Types.ObjectId,ref:'Spot',required:true},checkInTime:{type:Date,default:Date.now},checkOutTime:Date,durationHours:Number,fee:Number,status:{type:String,enum:['active','completed'],default:'active'}},{timestamps:true});
schema.index({plateNumber:1},{unique:true,partialFilterExpression:{status:'active'}});schema.index({status:1,checkInTime:-1});
module.exports=mongoose.model('ParkingVisit',schema);

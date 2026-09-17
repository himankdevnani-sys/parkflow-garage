const Spot=require('../models/Spot');
const types=v=>v==='ev'?['ev']:v==='compact'?['compact','standard']:['standard'];
async function reserveCompatibleSpot(vehicleType){return Spot.findOneAndUpdate({type:{$in:types(vehicleType)},status:'available'},{$set:{status:'occupied'}},{new:true,sort:{level:1,spotNumber:1}})}
async function releaseSpot(id){await Spot.findByIdAndUpdate(id,{$set:{status:'available',currentVisit:null}})}
module.exports={types,reserveCompatibleSpot,releaseSpot};

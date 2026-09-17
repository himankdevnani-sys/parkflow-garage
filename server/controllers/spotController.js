const Spot=require('../models/Spot');
exports.list=async(req,res,next)=>{try{const filter={};for(const key of ['status','type','level'])if(req.query[key])filter[key]=req.query[key];res.json(await Spot.find(filter).sort({level:1,spotNumber:1}))}catch(e){next(e)}};
exports.create=async(req,res,next)=>{try{const spot=await Spot.create(req.body);res.status(201).json(spot)}catch(e){next(e)}};
exports.availability=async(req,res,next)=>{try{const rows=await Spot.aggregate([{$group:{_id:{type:'$type',status:'$status'},count:{$sum:1}}}]);const counts={compact:{available:0,occupied:0},standard:{available:0,occupied:0},ev:{available:0,occupied:0}};rows.forEach(r=>counts[r._id.type][r._id.status]=r.count);res.json({counts,evSpotAvailable:counts.ev.available>0})}catch(e){next(e)}};

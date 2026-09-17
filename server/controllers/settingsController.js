const Settings=require('../models/GarageSettings');
exports.get=async(req,res,next)=>{try{res.json(await Settings.findOne())}catch(e){next(e)}};
exports.update=async(req,res,next)=>{try{let value=await Settings.findOne();if(!value)value=new Settings();['garageName','firstHourRate','additionalHourRate','dailyCap'].forEach(k=>{if(req.body[k]!==undefined)value[k]=req.body[k]});await value.save();res.json(value)}catch(e){next(e)}};

const Settings=require('../models/GarageSettings');const {cleanRateCard}=require('../services/rateCardService');
exports.get=async(req,res,next)=>{try{res.json(await Settings.findOne())}catch(e){next(e)}};
exports.update=async(req,res,next)=>{try{let value=await Settings.findOne();if(!value)value=new Settings();['garageName','firstHourRate','additionalHourRate','dailyCap'].forEach(k=>{if(req.body[k]!==undefined)value[k]=req.body[k]});await value.save();res.json(value)}catch(e){next(e)}};
// Accepts intentionally messy JSON/CSV-parsed rows and persists only validated prices.
exports.importRateCard=async(req,res,next)=>{try{const {card,rejected}=cleanRateCard(req.body.rateCard??req.body.rows);let value=await Settings.findOne();if(!value)value=new Settings();value.rateCard=card;await value.save();res.json({message:'Rate card imported',rateCard:card,rejected})}catch(e){res.status(400).json({message:e.message})}};

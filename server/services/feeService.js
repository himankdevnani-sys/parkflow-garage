function ratesFor(settings,vehicleType){return settings.rateCard?.[vehicleType]||settings}
function calculateFee(checkInTime,checkOutTime,settings,vehicleType='standard'){const elapsed=new Date(checkOutTime)-new Date(checkInTime);if(elapsed<=0)throw new Error('Check-out time must be after check-in time');const durationHours=Math.ceil(elapsed/3600000),rates=ratesFor(settings,vehicleType);const fee=Math.min(rates.firstHourRate+Math.max(0,durationHours-1)*rates.additionalHourRate,rates.dailyCap);return {durationHours,fee}}
module.exports={calculateFee,ratesFor};

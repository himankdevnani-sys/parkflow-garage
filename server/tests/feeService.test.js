const test=require('node:test');const assert=require('node:assert/strict');const {calculateFee}=require('../services/feeService');
const rates={firstHourRate:100,additionalHourRate:60,dailyCap:500};const start=new Date('2026-01-01T00:00:00Z');
test('first started hour',()=>assert.deepEqual(calculateFee(start,new Date(+start+20*60000),rates),{durationHours:1,fee:100}));
test('rounds partial hours',()=>assert.deepEqual(calculateFee(start,new Date(+start+61*60000),rates),{durationHours:2,fee:160}));
test('caps long stays',()=>assert.equal(calculateFee(start,new Date(+start+12*3600000),rates).fee,500));
test('uses a cleaned rate card per spot type',()=>{const settings={...rates,rateCard:{ev:{firstHourRate:200,additionalHourRate:80,dailyCap:700}}};assert.deepEqual(calculateFee(start,new Date(+start+61*60000),settings,'ev'),{durationHours:2,fee:280})});

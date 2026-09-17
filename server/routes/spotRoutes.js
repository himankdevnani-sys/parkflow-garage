const router=require('express').Router(),c=require('../controllers/spotController');router.get('/availability',c.availability);router.get('/',c.list);router.post('/',c.create);module.exports=router;

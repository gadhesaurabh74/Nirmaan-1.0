const express=require('express');
const router=express.Router();


router.get('/', function(req, res){
    res.send("This is the users page");
});



module.exports=router;
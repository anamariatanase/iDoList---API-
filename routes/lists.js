const express = require('express');

const router = express.Router();
router.get('/lists',(req,res)=>{
    res.send('lists here');
});
router.get('/',(req,res)=>{
    res.send('lists here 1 ');
});

router.post('/',(req,res)=>{
    console.log(req.body);
})
module.exports = router;
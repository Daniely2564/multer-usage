const router = require('express').Router();

router.route('/').
    get((req,res)=>{
    res.render('index/main');
    })
    .post((req,res)=>{
        const file = req.file;
        console.log(file);
    })
    

module.exports = router;
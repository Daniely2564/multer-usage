const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.route('/download')
    .get((req,res)=>{
        res.render('download/index');
    })

router.route('/download/:id')
    .get((req,res)=>{
        const item = path.resolve(__dirname+'/../public/uploads/daniel_resume.pdf');
        fs.readFile(item,(err,data)=>{
            if(err) return console.log(err);
            res.setHeader('Content-Type','application/pdf');
            res.setHeader('Content-disposition',`inline; filename="${req.params.id}"`)
            //res.setHeader('Content-disposition',`attachment; filename="${req.params.id}"`)  In order to download the file right way
            res.send(data)
        })
    })
module.exports = router;
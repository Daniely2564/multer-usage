const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.route('/download')
    .get((req,res)=>{
        res.render('download/index');
    })

router.route('/download2/:id')
    .get((req,res)=>{
        const itemPath = path.resolve(__dirname+'/../public/uploads/daniel_resume.pdf');
        const file = fs.createReadStream(itemPath);
        res.setHeader('Content-Type','application/pdf');
        res.setHeader('Content-Disposition',`inline; filename="${req.params.id}"`);
        file.pipe(res); // allows to stream the data, especially for bigger files.
    })
module.exports = router;
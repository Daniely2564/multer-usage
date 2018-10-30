const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit')
router.route('/pdf')
    .get((req,res)=>{
        res.setHeader('Content-Type','application/pdf');
        res.setHeader('Content-disposition',`inline; filename="${req.params.id}"`)
        const dest = path.resolve(__dirname,'..','public','random','random.pdf');
        const pdfDoc = new PDFDocument();
        pdfDoc.pipe(fs.createWriteStream(dest));
        pdfDoc.pipe(res);

        pdfDoc.fontSize(26).text('Invoice',{
            underline:true,
        });
        pdfDoc.text('_____________________________')
        // make sure to tell pdfkit when Im done
        pdfDoc.end();
    })

module.exports = router;
const express = require('express');
const serverConfig = require('./serverConfig');

const app = express();

serverConfig(app);

app.use('/',require('./routers/index'));
app.use(require('./routers/download'));
app.use(require('./routers/download2'));
app.use(require('./routers/pdfgen'));
app.use((req,res,next)=>{
    res.status(404).render('errors/page404');
})
app.listen(3000);
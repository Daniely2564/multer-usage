const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const validator = require('express-validator');
const handlebars = require('handlebars');
const cookieParser = require('cookie-parser');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,`${new Date().getTime()}-${file.originalname}`);
    }
});

const fileFilter = (req,file,cb)=>{
    // cb(null,file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
    cb(null,true);
    //cb(err, decide whether to store file);
}

module.exports = function(app){
    app.engine('hbs', hbs({
        extname: 'hbs',
        defaultLayout: 'layout',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    }));
    
    app.set('view engine', 'hbs');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    /*
        multer options can be
        multer({dest:'save to such destination'})
    */
    app.use(multer({ storage:fileStorage,fileFilter:fileFilter,limits:{fileSize:1024*1024*5}}).single('image'))
    app.use(express.static(__dirname + '/public'));
    app.use(cookieParser());
    
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));
    
    app.use(validator({
        errorFormatter: function (param, message, value) {
            var namespace = param.split('.'),
                root = namespace.shift(),
                formParam = root;
    
            while (namespace.length) {
                formParam += '[' + namespace.shift() + `]`;
            }
    
            return {
                param: formParam,
                message: message,
                value: value
            }
        }
    }))
    app.use(flash());
}
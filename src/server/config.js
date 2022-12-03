const path = require('path')
var  exphbs = require('express-handlebars')
const morgan = require('morgan')
const multer = require('multer')
const express = require('express')
const routes = require('../routes/index')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const errorHandler = require('errorhandler')
module.exports = app =>{
    app.set('port',process.env.PORT ||  3000);
    app.set('views',path.join(__dirname,'../views'))
    app.engine('.hbs',exphbs.engine({
        defaultLayout:'main',
        partialsDir:path.join(app.get('views'),'partials'),
        layoutsDir:path.join(app.get('views'),'layouts'),
        extname:'.hbs',
        helpers:require('./helpers'),
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }))
    app.set('view engine','.hbs');
    app.use(morgan('dev'))
    app.use(multer({dest:path.join(__dirname,'../public/upload/temp')}).single('image'))
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())
    app.use(session({
        secret:'mysecretsession',
        resave:false,
        saveUninitialized:false
    }))
    app.use(flash())
    app.use(passport.initialize())
    app.use(passport.session())
    app.use((req,res,next)=>{
        app.locals.signupMessage= req.flash('signupMessage')
        app.locals.signinMessage= req.flash('signinMessage')
        app.locals.user = req.user
        next()
    })
    

    routes(app);

    app.use('/public',express.static(path.join(__dirname,'../public')))

    if('development' === app.get('env')){
        app.use(errorHandler)
    }

    return app;
}
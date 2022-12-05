const express = require('express')
const router = express.Router()
const home = require('../controllers/home')
const image = require('../controllers/image')
const signin = require('../controllers/signin')
const signup = require('../controllers/signup')
const logout = require('../controllers/logout')
const photo = require('../controllers/photo')
const {upload,users} = require('../models/index')


module.exports = app=>{
    router.get('/signup',signup.signupG)
    router.post('/signup',signup.signupP)

    router.get('/signin',signin.singinG)
    router.post('/signin',signin.singinP)

    
    
    router.use((req,res,next)=>{
        isAuthenticated(req,res,next)
        next()
    })
    router.get('/',home.index)
    router.get('/images/:image_id',image.index)
    router.post('/images',image.create)
    router.post('/images/:image_id/like',image.like)
    router.post('/iamges/:image_id/comment',image.coment)
    router.delete('/images/:image_id',image.delete)
    router.get('/logout',logout.logoutG)
    

    router.get('/profile/:username',isAuthenticated,async(req,res,next)=>{
        const use = await users.findOne({username:{$regex:req.params.username}})
        const photo = await upload.find({username_id:use._id})
        console.log(photo)
        res.render('profile',{photo:photo})
    })
    router.post('/photo/:username',photo.photo)

    function isAuthenticated (req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        res.redirect('/signin')
    };



    app.use(router)
}
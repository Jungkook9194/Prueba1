const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {users} = require('../models/index')
const Swal = require('sweetalert2')

//Temp

const path = require("path");
const { randomNumber } = require("../helpers/libs");
const fs = require("fs-extra");


passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    const user = await users.findById(id)
    done(null,user);
})


passport.use('local-signup',new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback:true
},async(req,username,password,done)=>{
    const euser = await users.findOne({username:username})
    if(euser){
        return done(null,false,req.flash('signupMessage','El Usuario ya existe'))
    }else{
        const saveImage = async () => {
            const imageUrl = randomNumber();
            const images = await users.find({ filename: imageUrl });
            if (images.length > 0) {
              saveImage();
            } else {
              console.log(imageUrl);
              const imagepath = req.file.path;
              const ext = path.extname(req.file.originalname).toLowerCase();
              const targetPath = path.resolve(`src/public/upload/${imageUrl}${ext}`);
              if (ext === ".png" || ext === ".jpg" || ext == ".jpeg") {
                await fs.rename(imagepath, targetPath);
                const user = new users();
                user.name = req.body.name,
                user.surname = req.body.surname,
                user.filename = imageUrl + ext,
                user.username = username;
                user.password = user.encryptPassword(password);
                await user.save();
                done(null,user);
              } else {
                await fs.unlink(imagepath);
                res.status(500).json({ error: "Solos imagenes permitidas" });
              }
            }
          };
          saveImage();
    }
}))



passport.use('local-signin',new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback:true
},async(req,username,password,done)=>{
    const use = await users.findOne({username:username})
    if(!use){
        return done(null,false,req.flash('signinMessage','Usuario Incorrecto!'))
    }
    if(!use.comparePassword(password)){
        return done(null,false,req.flash('signinMessage','Contrasenia Incorrecta!'))
    }
    done(null,use)
}))



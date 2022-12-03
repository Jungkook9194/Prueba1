const crtl = {}
const passport = require('passport')
crtl.singinG = (req, res) =>{
    res.render('signin')
}
crtl.singinP = passport.authenticate('local-signin',{
    successRedirect:'/',
    failureRedirect:'/signin',
    passReqToCallback:true
})

module.exports = crtl
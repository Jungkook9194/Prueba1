const crtl = {}


crtl.logoutG = (req,res,next) =>{
    req.logout(function(err){
        if(err){
            return next(err)
        }
        res.redirect('signin')
    })
}

module.exports = crtl
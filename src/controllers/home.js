const crtl = {   
}
const {image} =  require('../models')
crtl.index =async (req,res)=>{
    const images = await image.find().sort({timestamp: -1});
    res.render('index',{images:images})
}



module.exports = crtl;
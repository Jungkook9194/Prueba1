const path = require("path");
const { randomNumber } = require("../helpers/libs");
const fs = require("fs-extra");
const { image, comments} = require("../models/index");
const md5 = require('md5');
const { error } = require("console");
const crtl = {};

crtl.index = async (req, res) => {
    const img = await image.findOne({filename:{$regex:req.params.image_id}})
    if(img){
      img.views = img.views+1;
      await img.save();
      const comment = await comments.find({image_id:img._id})
      res.render('image',{img,comment})
    }else{
      res.redirect('/')
    }
    
};

crtl.create = (req, res) => {
  const saveImage = async () => {
    const imageUrl = randomNumber();
    const images = await image.find({ filename: imageUrl });
    if (images.length > 0) {
      saveImage();
    } else {
      console.log(imageUrl);
      const imagepath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase();
      const targetPath = path.resolve(`src/public/upload/${imageUrl}${ext}`);
      if (ext === ".png" || ext === ".jpg" || ext == ".jpeg") {
        await fs.rename(imagepath, targetPath);
        const newImg = new image({
          title: req.body.title,
          filename: imageUrl + ext,
          description: req.body.description,
        });
        const imageSave = await newImg.save();
        res.redirect('/images/'+imageUrl)
      } else {
        await fs.unlink(imagepath);
        res.status(500).json({ error: "Solos imagenes permitidas" });
      }
    }
  };
  saveImage();
};

crtl.like = async  (req, res) => {
  const img = await image.findOne({uniqueId:{regex:req.params.image_id}});
  if(img){
    img.likes = img.likes + 1;
    await img.save();
    res.send({likes:img.likes})
  }else{
    res.send(error)
  }
};
crtl.coment = async (req, res) => {
  const img = await image.findOne({filename:{$regex:req.params.image_id}})
  if(img){
    const newComment = new comments(req.body)
    newComment.gravatar= md5(newComment.email)
     newComment.image_id = img._id;
     await newComment.save();
     res.redirect('/images/'+img.uniqueId)
  }else{
    res.redirect('/')
  }
  
  
};
crtl.delete =async (req, res) => {
  const img = await image.findOne({filename:{$regex:req.params.image_id}})
  if(img){
    await fs.unlink(path.resolve('./src/public/upload/'+img.filename))
    await comments.deleteOne({image_id:img._id})
    await img.remove()
    res.json(true)
  }
};

module.exports = crtl;

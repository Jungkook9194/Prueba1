const crtl = {}
const path = require("path");
const { randomNumber } = require("../helpers/libs");
const fs = require("fs-extra");
const {banner,users} = require('../models/index')
const md5 = require('md5');
const { error } = require("console");

crtl.banner = async(req,res,next) =>{
    const use = await users.findOne({username:{$regex:req.params.username}})
    const saveImage = async () => {
        const imageUrl = randomNumber();
        const images = await banner.find({ filename: imageUrl });
        if (images.length > 0) {
          saveImage();
        } else {
          console.log(imageUrl);
          const imagepath = req.file.path;
          const ext = path.extname(req.file.originalname).toLowerCase();
          const targetPath = path.resolve(`src/public/upload/${imageUrl}${ext}`);
          if (ext === ".png" || ext === ".jpg" || ext == ".jpeg") {
            await fs.rename(imagepath, targetPath);
            const newImg = new banner({
              title: req.body.title,
              filename: imageUrl + ext,
              username_id : use._id
            });
            const imageSave = await newImg.save();
            res.redirect('/')
          } else {
            await fs.unlink(imagepath);
            res.status(500).json({ error: "Solos imagenes permitidas" });
          }
        }
      };
      saveImage();
    };



module.exports = crtl

const mongoose = require('mongoose')
const bcry = require('bcryptjs')
const {Schema} = mongoose

const usernameSchema = new Schema({
    name: {type:String},
    surname : {type:String},
    username : {type:String},
    password : {type:String},
    filename : {type:String},
})



usernameSchema.virtual('uniqueId').get(function(){
    return this.filename.replace(path.extname(this.filename),'')
})


usernameSchema.methods.encryptPassword= (password) =>{
    return bcry.hashSync(password,bcry.genSaltSync(10));
}

usernameSchema.methods.comparePassword = function(password){
    return bcry.compareSync(password,this.password);
}

module.exports = mongoose.model('users',usernameSchema)
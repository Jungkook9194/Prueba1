const mongoose = require('mongoose')

var datetime = new Date()

const {Schema} = mongoose

const path = require('path')

const imageSchema = new Schema({
    title:{type:String},
    description:{type:String},
    filename:{type:String},
    views:{type:Number,default:0},
    likes:{type:Number,default:0},
    timestamp:{type:Date,default:datetime}
})

imageSchema.virtual('uniqueId').get(function(){
    return this.filename.replace(path.extname(this.filename),'')
})

module.exports = mongoose.model('Image',imageSchema)
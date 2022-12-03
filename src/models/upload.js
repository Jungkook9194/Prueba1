const mongoose = require('mongoose')
const {Schema,model} = mongoose
const ObjectId = Schema.ObjectId;
const uploadSchema = new Schema({
    title:{type:String},
    filename:{type:String},
    username_id:{type:ObjectId},
},{
    versionKey:false
})
uploadSchema.virtual('uniqueId').get(function(){
    return this.filename.replace(path.extname(this.filename),'')
})


module.exports = model('uploads',uploadSchema)

const {Schema, model} = require('mongoose')
const ObjectId = Schema.ObjectId;
var datetime = new Date()
const commnetSchema = new Schema({
    image_id:{type:ObjectId},
    name:{type:String},
    comment:{type:String},
    timestamp:{type:Date,default:datetime}

},{
    versionKey:false,
})


module.exports = model('comments',commnetSchema)
const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
name:String,
prize:Number,
company:String,
model:String
})
module.exports=mongoose.model("product",productSchema)
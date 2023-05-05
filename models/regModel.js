const mongoose=require("mongoose")
const regSchema=new mongoose.Schema({
fname:String,
lname:String,
password:String,
email:String
})
module.exports=mongoose.model("reg",regSchema)
const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true}
},{
    timestamps:true,
    versionKey:false,
});

const Product = mongoose.model("product", productschema);
module.exports = Product;
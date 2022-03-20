const express= require("express");
const router = express.Router()
const authenticate= require("../middleware/authenticate")


const Product = require("../model/product.model")

router.get("",async(req,res)=>{
try{
    const product = await Product.find().lean();
    res.status(200).send(product);
}catch(err){
    res.status(500).send({message:err.message});
}
})

router.post("",authenticate,async(req,res) => {
    req.body.userId=req.user._id
try{

    const product = await Product.create(req.body);
return res.status(201).send(product);
}catch(err){
    res.status(500).send({message:err.message});
}
})
//updating
router.patch("/:id",authenticate , async(req,res)=>{
    try{
        const product= await Product.findByIdAndUpdate(req.params.id,req.body);
        return res.status(200).send(product);
    }catch(err){
        return res.status(500).send({message:err.message})
    }
  
});
//delete
router.delete("/:id",authenticate , async(req,res)=>{
    try{
        const product= await Product.findByIdAndDelete(req.params.id,req.body);
        return res.status(200).send(product);
    }catch(err){
        return res.status(500).send({message:err.message})
    }
  
});


module.exports = router;
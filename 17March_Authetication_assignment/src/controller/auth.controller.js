const User = require("../model/user.model.js");
const jwt = require('jsonwebtoken');
require("dotenv").config()

const newToken=(user)=>{
    return jwt.sign({user}, process.env.SECRET_KEY);
}

const register = async (req,res)=>{
try{
   let user = await User.findOne({email:req.body.email})

   //if user already exist
   if(user)
   return res.status(400).send({message:"Email already Exist"});


   //if new user create it
   else 
  { user=await User.create(req.body)
   const token = newToken(user)
return res.status(200).send({user,token})
// return res.status(200).send(user);
}
}catch(err){

    res.status(400).send({message:err.message})
}
};









const login = async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
return res.status(400).send("Wrong Email or Password")}

//if email exist then we need to check whether the passowrd entered is correct or not

else {
const match = user.checkPassword(req.body.password);
//req.body.password ==> it is the password that the user is entering.

//if it doesnt match;
if(!match){
    res.status(400).send({message:"Wrong Email or Password"});
}
else {
    const token = newToken(user)
return res.status(200).send({user,token})   
}
}
        
        }catch(err){
            res.status(400).send({message:err.message})
        }
}

module.exports = {register, login}
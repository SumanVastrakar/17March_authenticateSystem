const mongoose = require("mongoose");
const bcrypt = require ("bcrypt")
//user schema
const userSchema = new mongoose.Schema(
    {
        "name": { type: String, required: true },
        "email": { type: String, required: true },

        //we will not store our password as a plain text, there may be chances of hackeing of pass so we will
        // bcrypt of the password.
        "password": { type: String, required: true },
    },
    {
        versionKey: false,
        timestamp: true,

    }
);

//here we will not use arrow function since arrow funcrtion wont work with this.
userSchema.pre("save", function(next){
    // bcrypt is an external library for hashing our password 
    const hash = bcrypt.hashSync(this.password,8);
    //(this.password,salt/round)
//salt is default string where as round is the no of rounds hashing should be done
    this.password=hash;
next();
});
//password=>it is the password that the user entered amd this.password is the password which is stored 
//in the data base of the user
userSchema.methods.checkPassword =function(password){
return bcrypt.compareSync(password, this.password); // true
}
//user model
const User = mongoose.model("user", userSchema);

module.exports = User;
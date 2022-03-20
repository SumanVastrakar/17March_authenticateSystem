require("dotenv").config()

const jwt = require('jsonwebtoken')
//this will check whether the user is authenticated or not,
//we are doing authorization just to ensure that once the user is logged in each time when he/she rteturns to the same page it wont ask .//again and again to log in and the browse should know that it is logged in ,

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        let decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) return reject(err);
            return resolve(decoded)

        })
        //jwt to verify whether the user was the same or not

    });
    //jwt.verify(token, 'shhhhh', function(err, decoded) {
}
const authenticate = async (req, res, next) => {
    //if our request.headers.authorization is not present then we will, not allow user to enter the products
    if (!req.headers.authorization)
        return res.status(400).send({ message: "authorization token not found" })

    if (!req.headers.authorization.startsWith("Bearer "))
        return res.status(400).send({ meassage: "Authorization token incorrect" });

    const token = req.headers.authorization.trim().split(" ")[1];
    let decoded;
    try {
        decoded = await verifyToken(token)
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: "Authorization token incorrect" })
    }
    console.log("request goes below")
    req.user=decoded.user;
    console.log(decoded);
    return next();

    // verifyToken(token);
}
module.exports = authenticate;
const express = require("express");
const connect = require("./configs/db.js");
const app = express();
app.use(express.json());

const userController = require("./controller/user.controller.js");
app.use("/users", userController)

const { register, login } = require("./controller/auth.controller.js");
app.post("/register", register);
app.post("/login", login)

const productController= require("./controller/product.controller");
app.use("/products",productController);




app.listen(4000, async () => {
    try {
        await connect();
        console.log("Listening on port 4000");
    } catch (err) {
        console.log(err.message);
    }

})
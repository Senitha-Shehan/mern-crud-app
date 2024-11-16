//Pass -  MqrHclf5DeW04UtC

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoute");


const app = express();

//middleware

app.use(express.json());
app.use("/users", router);


mongoose.connect("mongodb+srv://admin:MqrHclf5DeW04UtC@cluster0.kvzm4.mongodb.net/")
.then(() => console.log("Database Connected"))
.then(() => {
    app.listen(5000);
})
.catch((err) => console.log(err));


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {
        type: String,//DataType
        required: true,//Validate
    },

    gmail: {
        type: String,//DataType
        required: true,//Validate
    },

    age: {
        type: Number,//DataType
        required: true,//Validate
    },

    address: {
        type: String,//DataType
        required: true,//Validate
    }

});

module.exports = mongoose.model("UserModel", userSchema);
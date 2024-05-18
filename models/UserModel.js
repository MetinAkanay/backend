const {Schema, model} = require("mongoose")
const validator = require("validator")

const UserSchema = new Schema({
    userName : {
        type: String, 
        required: [true, "UserName field is required"], 
        minlength : [3, "Username must be 3 characters"], 
        unique : true
    },
    password : {
        type: String, 
        required: [true, "Password field is required"]
    },
    email : {
        type: String, 
        required: [true, "Email field is required"], 
        unique: true, 
        validate: { 
            validator: validator.isEmail, 
            message: "Email is invalid"
        }
    }
})

const User = model("User",UserSchema)
module.exports = User



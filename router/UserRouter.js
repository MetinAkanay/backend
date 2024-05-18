const express = require("express")
const User = require("../models/UserModel")
const UserRouter = express.Router()
const jwt = require("jsonwebtoken")

UserRouter.post("/register",async(req, res)=>{
    try {
        let savedUser = await User.create(req.body)
        res.status(200).send({status: true, message: `${savedUser.userName} Created! `})
    } catch (error) {
        res.status(404).send({status: false, message: error.message})
    }
})



UserRouter.post("/login",async(req, res)=>{
    try {
        const {userName, password} = req.body
        
        if(!userName || !password || userName === "" || password === ""){
            return res.status(404).send({status: false, message: "Username and Password must!"})
        }
        
        const enteredUser = await User.findOne({userName})
        if(!enteredUser){
            return res.status(404).send({status: false, message: "Username not found!"})
        }
            if(password === enteredUser.password){
                let access_token = jwt.sign({id:enteredUser._id, userName:enteredUser.userName}, process.env.KEYFORJWT,{expiresIn:"1h"})
                console.log(access_token)
                res.status(200).send({status: true, message: `Welcome ${userName}`, user:enteredUser})
            }
            else{
                res.status(404).send({status: false, message: "Incorrect Password"})
            }
        
    } catch (error) {
        res.status(404).send({status: false, message: error.message})
    }
})


module.exports = UserRouter
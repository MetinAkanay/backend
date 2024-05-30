const express = require("express")
const User = require("../models/UserModel")
const UserRouter = express.Router()
const jwt = require("jsonwebtoken")
const tokenControl = require("../middleware/auth")

UserRouter.post('/register', async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      if (!userName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const newUser = new User({ userName, email, password });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
        return res.status(400).json({ message: "Username or email already exists" });
      }
      res.status(500).json({ message: "Server Error" });
    }
  });



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
                res.status(200).send({status: true, message: `Welcome ${userName}`, user:enteredUser, access_token: access_token})
            }
            else{
                res.status(404).send({status: false, message: "Incorrect Password"})
            }
        
    } catch (error) {
        res.status(404).send({status: false, message: error.message})
    }
})

UserRouter.post("/resetPassword", async(req, res)=>{
    try {
        let {userName, password, newPassword} = req.body
        let userFromDb = await User.findOne({userName})
        if(!userFromDb || userFromDb.password !== password){
            return res.status(404).send({status: false, message: "Invalid Username or Password"})
        }
        await User.findOneAndUpdate({userName},{password: newpassword})
        res.status(200).send({status: true, message: "Password changed"})
    } catch (error) {
        res.status(404).send({status: false, message: error.message})
    }
})

UserRouter.put("/update", async(req, res)=>{
    try {
        const {userName} = req.body
        const {password} = req.body
        const {newpassword} = req.body
        const enteredUser = await User.findOne({userName})
        if(password === enteredUser.password){
            enteredUser.password = newpassword
            await User.findByIdAndUpdate(enteredUser._id, enteredUser)
            res.status(200).send({status:true, message: `${userName} kullanıcısının şifresi değiştirildi`, data:req.body})
        }
        
    } catch (error) {
        res.status(404).send({status: false, message: error.message})   
    }
})

UserRouter.get("/getAll", tokenControl,async(req,res)=>{
    try {
        let users = await User.find({})
        return res.status(200).send({status: true, message: "User List", users:users})

    } catch (error) {
        res.status(404).send({status: false, message: error.message})
    }
})


module.exports = UserRouter
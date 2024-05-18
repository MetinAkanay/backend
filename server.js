//npm install express --save
const express  = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const Product = require("./models/ProductModel")
const UserRouter = require("./router/UserRouter")

mongoose.connect("mongodb+srv://metin:metin@cluster1.rtue60d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err))


const app = express()
app.use(express.json())

app.use("/product", Product)
app.use("/user", UserRouter)

app.listen(9000,()=>{
    console.log('Merhaba Ben Çalıştım')
})

//npm install --save-dev nodemon  projeye yükler --save-dev yerine -g olursa global tüm pc ye yükler
//package.json a  "dev" : "nodemon server.js" ekledik
//npm run dev çalıştırdık terminalde

// mongodb'ye bağlanmak için mongoose yükledik 
// daha sonrasında mongoose'un required'larını yapıyoruz

// validor npm'ini indirdik 
// npm i validator

// token'ı saklamak için dotenv indiriyoruz
// npm i dotenv

// token oluşturmak için jsonwebtoken indiriyoruz
// npm i jsonwebtoken


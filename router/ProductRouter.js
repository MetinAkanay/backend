const express = require("express")
const Product = require("../models/ProductModel")
const ProductRouter = express.Router()



ProductRouter.route("/products").get(async(req,res)=>{
    try {
        const allProduct = await Product.find({})
        res.status(200).send({status : true, message : "All Product", data : allProduct})
    } catch (error) {
        res.status(404).send({status : false, message : error.message})
    }
})

ProductRouter.route("/addProduct").post(async(req,res)=>{
    try {
        let newProduct = req.body
        let savedData = await Product.create(newProduct)
        console.log(savedData)
        res.send({
            status : true,
            data : savedData,
            message :"Product Created" 
        })
    } catch (error) {
        res.status(404).send({status : false, message : error.message})
        console.log(error.message)
    }
})

ProductRouter.route("/product/:id").get(async(req,res)=>{
    try {
        let{id} = req.params
        const product = await Product.findById(id)
        res.status(200).send({status : 200, message: "Product Get", data: product})
    } catch (error) {
        res.status(404).send({status : false, message : error.message})
    }
})

ProductRouter.route("/products").delete(async(req,res)=>{
    try {
        let {id} = req.body
        const deletedProduct = await Product.findByIdAndDelete(id)
        console.log(deletedProduct)
        if(!deletedProduct){
            return res.status(404).send({status: false,message: "Product not deleted"})
        }
        res.status(200).send({status: true,message: "Product Deleted"})
    } catch (error) {
        res.status(404).send({status : false, message : error.message})
    }
})

ProductRouter.route("/products").put(async(req,res)=>{
    try {
        let data = req.body
        if(!data._id){
            return res.status(404).send({status: false, message: "Update edilecek Id Gonderilmedi"})
        }
        await Product.findByIdAndUpdate(data._id, req.body)
        res.status(200).send({status: true,message: "Product Updated", data: req.body})
        console.log(data)
    } catch (error) {
        res.status(404).send({status : false, message : error.message})
    }
})

module.exports = ProductRouter
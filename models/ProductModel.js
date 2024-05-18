const {Schema, model} = require("mongoose")

const productSchema = new Schema({
    productName : {type : String, required: [true, "productName field is required"]},
    price :{type : Number, required : [true, "Price field is required"]},
    quantity : {type : Number, required : [true, "Quantity field is required"]},
    image : {type : String, required : [true, "Image field is required"]},
})
const Product = model("Product",productSchema)
module.exports = Product

import mongoose, { Schema } from "mongoose"

const ProductSchema = new Schema({
      productName: {
            type: String,
            required: true,
            lowercase: true,
            index: true,
            trim: true,
            unique: true
      },
      productBrand: {
            type: String,
            required: true,
            lowercase: true,
            index: true,
            trim: true
      },
      productDescription: {
            type: String,
            required: true,
      },
      productListingPrice: {
            type: Number,
            required: true,
            min: 0,
            index: true
      },
      productSellingPrice: {
            type: Number,
            required: true,
            min: 0,
            index: true //enhance serch functionality
      },
      category: {
            type: String,
            index: true,
            required: true,
      },
      subcategory: {
            type: String,
            index: true,
            required: true,
      },
      productImage: []
      },{timestamps:true})

const Product = mongoose.model("Product", ProductSchema)
export default Product
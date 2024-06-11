import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import Product from "../../models/product.model.js";

const getProductCategory = asyncHandler(async(req, res)=>{
      const productCategory = await Product.distinct("category")
      console.log(productCategory)

      const categoryList = []
      for(let category of productCategory){
            const product = await Product.findOne({category:category})
            if(product){
                  categoryList.push(product)
            }
      }
      res.status(200).json(
            new ApiResponse(200 , categoryList,"ok")
      )
})
 export default getProductCategory
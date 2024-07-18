import asyncHandler from "../../utils/asyncHandler.js"
import ApiError from "../../utils/apiError.js"
import ApiResponse from "../../utils/apiResponse.js"
import Cart from "../../models/shoppingCart.model.js"
import Product from "../../models/product.model.js";

const addItemsToCartOfLoggedInCustomer = asyncHandler(async (req, res) => {
      const custId = req.customer._id
      const productId = Object.keys(req.body.cartData)[0]
      const ProductDetail = await Product.findById({_id:productId})
      const custCart = await Cart.findOne({ customerId: custId })
      try {
            if (custCart) {
                  const existingItemIndex = custCart.items.findIndex(item => item.productId.toString() === productId)
                  if (existingItemIndex >= 0) {
                        custCart.items[existingItemIndex].quantity = custCart.items[existingItemIndex].quantity + 1
                  }
                  else {
                        custCart.items.push({
                              productId: productId,
                              quantity: 1,
                              price: req.body.cartData[productId].price
                        })
                        custCart.totalNumberOfProduct += 1
                  }
                  await custCart.save()
            }
            else {
                  const newCustCart = new Cart({
                        customerId: custId,
                        items: [],
                        totalNumberOfProduct: 1
                  })
                  newCustCart.items.push({
                        productId: productId,
                        quantity: req.body.cartData[productId].quantity,
                        price: req.body.cartData[productId].price
                  })
                  await newCustCart.save()
            }

            res.status(200).json(
                  new ApiResponse(200, {}, `${ProductDetail.productName} added to the Cart`)
            )
      }
      catch (error) {
            console.log(error)
            res.status(500).json(
                  new ApiError(500, `Some Error occured: ${error?.message}`)
            )
      }
})

export default addItemsToCartOfLoggedInCustomer
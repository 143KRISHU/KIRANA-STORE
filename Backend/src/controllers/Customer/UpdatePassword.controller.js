import asyncHandler from "../../utils/asyncHandler.js"
import ApiError from "../../utils/apiError.js"
import ApiResponse from "../../utils/apiResponse.js"
import Customer from "../../models/customer.model.js"
import sendEmail from "../../utils/sendEmails.js"
const updatePassword = asyncHandler(async(req,res)=>{
     const {password , customerId} = req.body
     try {
      const getUpdatedCustomer = await Customer.findByIdAndUpdate({_id:customerId},{password:password},{new:true})
      if(getUpdatedCustomer){
            sendEmail(
                  getUpdatedCustomer.email,
                  `Hi ${getUpdatedCustomer.fullname}, Password Change Update`,
                  `Dear ${getUpdatedCustomer.fullname}, Your Login Password of Kirana Store Got Updated on ${Date.now().toLocaleString('en-IN')}.`
            )
            res.status(200).json(
                  new ApiResponse(200,{},'Password Got Updated Successfully')
            )
      }
     } catch (error) {
      console.log(error.message)
      res.status(500).json(
            new ApiError(500,'Internal Server Error')
      )
     }
})
export default updatePassword
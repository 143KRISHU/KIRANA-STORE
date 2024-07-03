import asyncHandler from "../../utils/asyncHandler.js"
import ApiError from "../../utils/apiError.js"
import ApiResponse from "../../utils/apiResponse.js"
import Customer from "../../models/customer.model.js"
import sendEmail from "../../utils/sendEmails.js"
import OTP from "../../models/otp.model.js"

const forgotPasswordVerification = asyncHandler(async (req, res) => {
      try {
            const { email } = req.body
            const getCustomer = await Customer.findOne({ email: email },{password:0,refreshToken:0,address:0})
            if (!getCustomer) {
                  res.status(400).json(
                        new ApiError(400, "Un-Registered Email!! Enter the Correct Email")
                  )
                  return
            }
            else {
                  const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString()
                  sendEmail(
                        getCustomer.email,
                        `Kirana Store - Forgot Password- Your One Time Password`,
                        `Hello, ${getCustomer.fullname.toUpperCase()}, Welcome to Kirana Store. Your One Time Password is : ${generatedOTP}. OTP is valid till 2 minutes`
                  )
                  const newOtpData = new OTP({
                        customerId:getCustomer._id,
                        otp : generatedOTP
                  })
                  await newOtpData.save()

                  if(newOtpData){
                        res.status(400).json(
                              new ApiResponse(200, {id: getCustomer._id}, "An Otp is Sent to Your resgistered Email")
                        )
                  }
            }
      } catch (error) {
            throw new ApiError(500, `Something Wrong Occurred : ${error}`);
      }
})
export default forgotPasswordVerification
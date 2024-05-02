import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"
import Customer from "../models/customer.model.js"
import Token from "../models/token.model.js"
import crypto from "crypto"
import sendEmail from "../utils/sendEmails.js"

const logInCustomer = asyncHandler(async function(req,res,next){
      const {email,password} = req.body;

      if(!email){
            res.status(400).json(
                  new ApiError(400,"Registered Email is Required??")
            )
      }

      if(!password){
            res.status(400).json(
                  new ApiError(400,"Password is Required??")
            )
      }
      const getcustomer = await Customer.findOne({email : email});
      const getToken = await Token.findOne({customerId : getcustomer._id});

      if(getToken){
            //Chcek token expiry
            const isTokenExpoired = (Date.now() - getToken.createdAt.getTime())>5*60*1000
            if(isTokenExpoired){
                  await Token.findByIdAndDelete(getToken._id);
                  const token = await new Token({
                        customerId:getcustomer._id,
                        token:crypto.randomBytes(32).toString("hex"),
                  }).save();
            
                  const url = `${process.env.BASE_URL}/customer/${getcustomer._id}/verify/${token.token}`;
                  await sendEmail(getcustomer.email,"Verify Email",url);
                  res.status(200).json(
                        new ApiResponse(200,"Email is sent to your Registered Email first Verify")
                  )
            }
      }

      if(!getcustomer){
            res.status(400).json(
                  new ApiError(400,"You are Not Registered")
            )
      }

      if(!getcustomer.verified){

            res.status(400).json(
                  new ApiError(400,"Your Email is not verified, Kindly verify your Email")
            )
      }

})

export default logInCustomer;
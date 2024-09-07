import  ApiError  from "../utils/apiError.js";
import  asyncHandler  from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken"
import Customer from "../models/customer.model.js";

const verifyCustomer = asyncHandler(async (req, res, next) => {
      try {
            const token = req.cookies?.accessToken ||
                  req.header("Authorizarion")?.replace("Bearer ", "");
            if (!token) {
                  res
                        .status(401)
                        .json(new ApiError(401, "User not Login"));
                  return
            }

            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const customer = await Customer.findById(decodedToken?._id).select("-password -refreshToken");

            if (!customer) {
                  res
                        .status(401)
                        .json(new ApiError(401, "Invalid Access Token"));
                  return
            }

            req.customer = customer;
            next()
      } catch (error) {
            console.log(error)
            res
                  .status(401)
                  .json(new ApiError(401,  "Invalid Access kindly login Agian"));
            return
      }
})

export default verifyCustomer
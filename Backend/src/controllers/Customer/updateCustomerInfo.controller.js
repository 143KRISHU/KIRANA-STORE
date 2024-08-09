import asyncHandler from "../../utils/asyncHandler.js"
import ApiError from "../../utils/apiError.js"
import ApiResponse from "../../utils/apiResponse.js"
import Customer from "../../models/customer.model.js"

const updateCustomerInfo = asyncHandler(async (req, res) => {
      const customerId = req.customer._id
      const data = req.body
      const customerToUpdate = await Customer.findById({ _id: customerId }, { password: 0, refreshToken: 0 })
      try {
            if (customerToUpdate) {
                  const firstName = req.body.firstName !== '' ? req.body.firstName : customerToUpdate.firstName
                  const middleName = req.body.middleName !== '' ? req.body.middleName : customerToUpdate.middleName
                  const lastName = req.body.lastName !== '' ? req.body.lastName : customerToUpdate.lastName
                  const updatedCustomer = await Customer.findOneAndUpdate(
                        { _id: customerId },
                        {
                              firstName: firstName,
                              middleName: middleName,
                              lastName: lastName
                        },
                        { new: true }, { password: 0, refreshToken: 0 }
                  )
                  res.status(200).json(
                        new ApiResponse(200, updatedCustomer, 'Details Updated Successfully')
                  )
            }
      } catch (error) {
            console.log(error.message)
            res.status(500).json(
                  new ApiError(500, `Server Error : ${error.message}`)
            )
      }
})

export default updateCustomerInfo
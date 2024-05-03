import ApiResponse from "../utils/apiResponse.js"

function showCustomerDetails(req, res, next) {
      res.status(200).json(
            new ApiResponse
                  (200, req.customer, `Welcome ${req.customer.fullname.toUpperCase()}`
                  )
      )
}

export default showCustomerDetails

import {Router} from "express"
import createOrder from "../controllers/OrderAndPayment/createOrder.controller.js"
import getSpecificOrderDetail from "../controllers/OrderAndPayment/getspecificOrderDeatils.controller.js"
import verifyPayment from "../controllers/OrderAndPayment/verifyPayment.js"
import verifyCustomer from "../middlewares/cutomerAuth.middleware.js"

const paymentOrderRouter = Router()

paymentOrderRouter.route('/createOrder').post(verifyCustomer,createOrder)
paymentOrderRouter.route('/verifyPayment').post(verifyCustomer,verifyPayment)
paymentOrderRouter.route('/SpecificOrderData').post(verifyCustomer,getSpecificOrderDetail)

export default paymentOrderRouter;
import {Router} from "express"
import signUpCustomer from "../controllers/Customer/cutomerSignUp.controller.js";
import logInCustomer from "../controllers/Customer/customerlogIn.controller.js";
import logOutCustomer from "../controllers/Customer/customerlogout.controller.js"
import verifyEmail from "../controllers/Customer/cutomerVerifyEmail.controller.js";
import verifyCustomer from "../middlewares/cutomerAuth.middleware.js"
import showCustomerDetails from "../controllers/Customer/showCustomerDetails.controller.js";
const customerRouter = Router()

customerRouter.route("/signup").post(signUpCustomer);
customerRouter.route("/login").post(logInCustomer);
customerRouter.route("/logout").post(verifyCustomer,logOutCustomer);
customerRouter.route("/:id/verify/:token").post(verifyEmail);
customerRouter.route("/customer-details").get(verifyCustomer,showCustomerDetails)
export default customerRouter;
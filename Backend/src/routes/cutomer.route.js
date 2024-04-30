import {Router} from "express"
import signUpCustomer from "../controllers/cutomerSignUp.controller.js";
import logInCustomer from "../controllers/customerlogIn.controller.js";
import logOutCustomer from "../controllers/customerlogout.controller.js"
const customerRouter = Router()

customerRouter.route("/signup",signUpCustomer);
customerRouter.route("/login",logInCustomer);
customerRouter.route("/logout",logOutCustomer);

export default customerRouter;
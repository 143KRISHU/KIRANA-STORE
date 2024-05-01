import {Router} from "express"
import signUpCustomer from "../controllers/cutomerSignUp.controller.js";
import logInCustomer from "../controllers/customerlogIn.controller.js";
import logOutCustomer from "../controllers/customerlogout.controller.js"
const customerRouter = Router()

customerRouter.route("/signup").post(signUpCustomer);
customerRouter.route("/login").post(logInCustomer);
customerRouter.route("/logout").post(logOutCustomer);

export default customerRouter;
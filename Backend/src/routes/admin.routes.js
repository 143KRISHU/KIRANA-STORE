import {Router} from "express"
import verifyCustomer from "../middlewares/cutomerAuth.middleware.js"
import showAllCustomer from "../controllers/Admin/showallcustomer.controller.js";
import updateCustomerRole from "../controllers/Admin/updateCustomerRole.js";
const adminRouter = Router()


adminRouter.route("/details");
adminRouter.route("/show-all-customer").get(verifyCustomer,showAllCustomer);
adminRouter.route("/customer-role-update").post(verifyCustomer,updateCustomerRole)

export default adminRouter;
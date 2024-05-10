import {Router} from "express"
import verifyCustomer from "../middlewares/cutomerAuth.middleware.js"
import showAllCustomer from "../controllers/Admin/showallcustomer.controller.js";
import updateCustomerRole from "../controllers/Admin/updateCustomerRole.js";
import showAdminData from "../controllers/Admin/showAdminData.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import uploadImageToCloudinary from "../controllers/Admin/uploadImageOnCloudinary.js";
const adminRouter = Router()


adminRouter.route("/data").get(verifyCustomer,showAdminData);
adminRouter.route("/show-all-customer").get(verifyCustomer,showAllCustomer);
adminRouter.route("/customer-role-update").post(verifyCustomer,updateCustomerRole)
adminRouter.route("/upload-image").post(upload.single('file'),uploadImageToCloudinary)
export default adminRouter;
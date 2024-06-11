import { Router } from "express";
import getProductCategory from "../controllers/Product Controller/getProductCategories.controller.js";

const productRouter = Router()

productRouter.route('/showCategories').get(getProductCategory)

export default productRouter
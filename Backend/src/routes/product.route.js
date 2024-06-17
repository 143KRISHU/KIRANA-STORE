import { Router } from "express";
import getProductCategory from "../controllers/Product Controller/getProductCategories.controller.js";
import getSubCategoryWiseProduct from "../controllers/Product Controller/getSubcategoryWiseProduct.controller.js";

const productRouter = Router()

productRouter.route('/showCategories').get(getProductCategory)
productRouter.route('/subCategoryWiseProduct').post(getSubCategoryWiseProduct)

export default productRouter
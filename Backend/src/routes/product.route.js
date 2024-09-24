import { Router } from "express";
import getCategoryWiseProduct from "../controllers/Product Controller/getcategoryWiseProduct.js";
import getProductCategory from "../controllers/Product Controller/getProductCategories.controller.js";
import getSubCategoryWiseProduct from "../controllers/Product Controller/getSubcategoryWiseProduct.controller.js";
import searchProductFromDB from "../controllers/Product Controller/searchProduct.js";
import updateProductImages from "../controllers/Product Controller/updateProductImages.controller.js";
import updateProductInfoData from "../controllers/Product Controller/updateProductInfoData.controller.js";

const productRouter = Router()

productRouter.route('/showCategories').get(getProductCategory)
productRouter.route('/subCategoryWiseProduct').post(getSubCategoryWiseProduct)
productRouter.route('/categoryWiseProduct').post(getCategoryWiseProduct)
productRouter.route('/productImageUpdate').post(updateProductImages)
productRouter.route('/productInfoDataUpdate').post(updateProductInfoData)
productRouter.route('/search').get(searchProductFromDB)

export default productRouter
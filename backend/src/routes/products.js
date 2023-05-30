const express = require("express");
const router = express.Router();

const { authJwt } = require("../app/middleware");
const ProductsController = require("../app/controllers/ProductsController");

// Admin

router.post("/create", ProductsController.create);

// post list producst with pagination
router.post("/listProducts", ProductsController.getListWithPaginate);

// get detail products
router.get("/detail/:id", ProductsController.getDetail);

// update products
router.put("/update/:id", ProductsController.update);

// delete products
router.delete("/delete/:id", ProductsController.delete);

// End

module.exports = router;

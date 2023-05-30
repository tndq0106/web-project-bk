const express = require("express");
const router = express.Router();
const { authJwt } = require("../app/middleware");
const OrderController = require("../app/controllers/OrderController");

// Get list order client
router.post("/get-list-order-client", OrderController.getListOrderClient);

// Create order
router.post("/create-order", OrderController.createOrder);

// Get list order
router.post("/get-list-order", OrderController.getListOrder);

// Get detail order
router.get("/get-detail-order/:id", OrderController.getDetailOrder);

// Delete detail order
router.delete("/delete-detail-order/:id", OrderController.deleteDetailOrder);

// Update detail order
router.put("/update-detail-order/:id", OrderController.updateOrder);

module.exports = router;

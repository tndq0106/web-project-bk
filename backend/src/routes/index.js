const authRouter = require("./auth");
const productsRouter = require("./products");
const orderRouter = require("./order");

function route(app) {
  // order
  app.use("/order", orderRouter);

  // product
  app.use("/products", productsRouter);

  // signin-signup for authenticate
  app.use("/auth", authRouter);

  // home
  app.get("/", (req, res, next) => {
    return res.status(200).json({
      message: "Server is OK - pham le song tuan -haha!",
    });
  });
}

module.exports = route;

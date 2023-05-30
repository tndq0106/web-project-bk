const Order = require("../models/Order");
const User = require("../models/User");

class OrderController {
  async createOrder(req, res, next) {
    try {
      const order = new Order(req.body);
      const result = await order.save();
      res.status(200).json({
        retCode: 0,
        retText: "Create successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getListOrder(req, res, next) {
    const getPagination = (page, size) => {
      const limit = size ? +size : 0;
      const offset = page === 1 ? 0 : (page - 1) * limit;

      return { limit, offset };
    };
    const { page, size, productText } = req.body;

    const filter = {};

    if (productText) {
      filter.name = { $regex: new RegExp(productText), $options: "i" };
    }

    const { limit, offset } = getPagination(page, size);

    Order.paginate(filter, { offset, limit })
      .then(async (data) => {
        const { totalDocs, docs, totalPages, page } = data || {};
        const listOrder = docs.map(async (item) => {
          const dataUser = await User.findById(item.userId);
          return {
            ...item,
            userId: dataUser,
          };
        });
        const resolvedPromises = await Promise.all(listOrder);
        const resultData = resolvedPromises.map((item) => {
          const { _doc, userId, cartId } = item || {};
          return {
            ..._doc,
            userId,
          };
        });
        res.json({
          retCode: 0,
          retText: "List order",
          retData: {
            totalItems: totalDocs,
            orders: resultData,
            totalPages: totalPages,
            currentPage: page - 1,
          },
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }

  async getDetailOrder(req, res, next) {
    try {
      const result = await Order.findById(req.params.id).exec();
      res.json({
        retCode: 0,
        retText: "Thành công",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteDetailOrder(req, res, next) {
    try {
      const result = await Order.deleteOne({
        _id: req.params.id,
      }).exec();
      res.json({
        retCode: 0,
        retText: "Successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateOrder(req, res, next) {
    try {
      const orderDetail = await Order.findById(req.params.id).exec();
      orderDetail.set(req.body);
      const result = await orderDetail.save();
      res.json({
        retCode: 0,
        retText: "Successfully",
        retData: result,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getListOrderClient(req, res, next) {
    const getPagination = (page, size) => {
      const limit = size ? +size : 0;
      const offset = page === 1 ? 0 : (page - 1) * limit;

      return { limit, offset };
    };
    const { page, size, productText, userId } = req.body;

    const filter = {};

    if (productText) {
      filter.name = { $regex: new RegExp(productText), $options: "i" };
    }

    if (userId) {
      Object.assign(filter, { userId });
    }

    const { limit, offset } = getPagination(page, size);

    Order.paginate(filter, { offset, limit })
      .then(async (data) => {
        res.json({
          retCode: 0,
          retText: "",
          retData: {
            totalItems: data.totalDocs,
            orders: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1,
          },
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }
}

module.exports = new OrderController();

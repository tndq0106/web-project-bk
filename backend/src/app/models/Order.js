const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const Order = new Schema(
  {
    userId: {
      type: String,
    },
    infoOrder: {
      type: Object,
    },
    listCart: {
      type: Array,
    },
    // statusOrder: {
    //   type: Number,
    // },
    // methodPayment: {
    //   type: Number,
    // },
    // methodReiceive: {
    //   type: Number,
    // },
    // voucherId: {
    //     type: String,
    // }
  },
  { timestamps: true }
);

Order.plugin(mongoosePaginate);

module.exports = mongoose.model("Order", Order);

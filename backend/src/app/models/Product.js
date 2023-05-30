const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

Product.index({ name: "text" }, { default_language: "english", minLength: 1 });
// const test = mongoose.model("Product", Product);
// test.collection.dropIndexes();
// test.syncIndexes();

Product.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", Product);

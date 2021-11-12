const { Schema, model } = require("mongoose");
const reviewSchema = require("./Review");
const dateFormat = require("../utils/dateFormat");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "must provide a product number"],
    },
    description: {
      type: String,
      required: [true, "must provide a item description for the consumer"],
    },
    price: {
      type: Number,
      required: [true, "must provide a price to you product"],
      maxLength: [6, "price should not exceed 6 digit"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [
        true,
        "please keep you product organize add a category to this item ",
      ],
    },
    stock: {
      type: Number,
      required: [
        true,
        "let you costumer knows how many of this product you have in stock",
      ],
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    reviews: [reviewSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ProductSchema.virtual("reviewCount").get(function () {
  return this.reviews.length;
});

const Product = model("Product", ProductSchema);
module.exports = Product;

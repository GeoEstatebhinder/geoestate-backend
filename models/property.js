// models/Property.js

const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      index: true,
    },
    images: {
      type: [String],
      validate: [arrayLimit, "Maximum 10 images allowed"],
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    propertyType: {
      type: String,
      enum: ["Apartment", "Villa", "House", "Plot", "Commercial"],
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    size: {
      type: Number,
      required: true,
      min: 0,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Custom validator for max 10 images
function arrayLimit(val) {
  return val.length <= 10;
}

module.exports = mongoose.model("Property", propertySchema);

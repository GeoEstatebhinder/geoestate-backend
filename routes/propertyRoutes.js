// routes/propertyRoutes.js

const express = require("express");
const router = express.Router();
const Property = require("../models/property"); // FIXED path case

// @route   GET /api/properties
// @desc    Get all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

// @route   POST /api/properties
// @desc    Create new property
router.post("/", async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const saved = await newProperty.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Validation Error: " + error.message });
  }
});

// (Optional) Add more endpoints for PUT, DELETE, etc.

module.exports = router;

// controllers/propertyController.js
import Property from '../models/property.js';
import { getCoordinates } from '../utils/geocode.js';

// Create new property
export const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      address,
      city,
      type,
      bedrooms,
      bathrooms,
      image,
      userId
    } = req.body;

    let property = new Property({
      title,
      description,
      price,
      address,
      city,
      type,
      bedrooms,
      bathrooms,
      image,
      user: userId,
    });

    // Auto-generate lat/lng if not provided
    if (!property.latitude || !property.longitude) {
      const coords = await getCoordinates(`${address}, ${city}`);
      if (coords) {
        property.latitude = coords.lat;
        property.longitude = coords.lng;
      }
    }

    await property.save();
    res.status(201).json(property);
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ message: 'Server error while creating property' });
  }
};

// Update property
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Auto-generate lat/lng if not provided in update
    if ((!updatedData.latitude || !updatedData.longitude) && (updatedData.address || updatedData.city)) {
      const coords = await getCoordinates(`${updatedData.address}, ${updatedData.city}`);
      if (coords) {
        updatedData.latitude = coords.lat;
        updatedData.longitude = coords.lng;
      }
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ message: 'Server error while updating property' });
  }
};

// Get single property
export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ message: 'Server error while fetching property' });
  }
};

// Get All Properties
export const getAllProperties = async (req, res) => {
  try {
    const { city, type, price_lte } = req.query;

    const filter = {};
    if (city) filter.city = new RegExp(city, 'i'); // case-insensitive
    if (type) filter.type = type;
    if (price_lte) filter.price = { $lte: price_lte };

    const properties = await Property.find(filter).sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// razorpay
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: 49900, // ₹499 (in paisa)
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
};

// Other functions like deleteProperty, getAllProperties, etc. can be added similarly

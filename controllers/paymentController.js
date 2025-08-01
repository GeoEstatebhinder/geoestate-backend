import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import Property from '../models/property.js';

dotenv.config();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. Create Order
export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: 49900, // ₹499 in paise
      currency: 'INR',
      receipt: `geoestate_rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error('❌ Razorpay order error:', err);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
};

// 2. Verify Payment
export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    propertyId
  } = req.body;

  try {
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // ✅ Mark property as premium
      await Property.findByIdAndUpdate(propertyId, { isPremium: true });
      return res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (err) {
    console.error('❌ Payment verification error:', err);
    res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
};

// 3. Manually Mark Property as Premium
export const makePremium = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });

    property.isPremium = true;
    await property.save();

    res.json({ message: '✅ Property marked as premium' });
  } catch (err) {
    console.error('❌ makePremium error:', err);
    res.status(500).json({ error: 'Failed to mark property as premium' });
  }
};

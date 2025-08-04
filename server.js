const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Simplified CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://lively-sundae-8fec8c.netlify.app',
    'https://www.geoestate.in',
    'https://geoestate.in',
  ],
  credentials: true
}));

// Middleware
app.use(express.json());

// Request Logger (optional)
app.use((req, res, next) => {
  console.log(`🔹 ${req.method} ${req.url}`);
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Routes
const propertyRoutes = require('./routes/propertyRoutes');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('🌐 GeoEstate backend is running on Render');
});

// 404 Fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❗ Server Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

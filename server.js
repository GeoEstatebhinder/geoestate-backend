const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load .env variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://lively-sundae-8fec8c.netlify.app',
    'https://geoestate.in',
    'https://www.geoestate.in'
  ],
  credentials: true,
}));
app.use(express.json());

// ✅ Logger for debugging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err.message);
  process.exit(1);
});

// ✅ Import routes
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// ✅ Use routes with proper prefix
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/payments', paymentRoutes);

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.send('🌐 GeoEstate backend is live!');
});

// ❌ 404 Fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 🔴 Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Global Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

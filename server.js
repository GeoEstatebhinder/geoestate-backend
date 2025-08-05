const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// ✅ CORS
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

// ✅ Log every request
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
  console.error('❌ MongoDB Error:', err.message);
  process.exit(1);
});

// ✅ Routes
const propertyRoutes = require('./routes/propertyRoutes');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('🌐 GeoEstate backend is live!');
});

// ✅ 404 route
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('🔴 Global Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

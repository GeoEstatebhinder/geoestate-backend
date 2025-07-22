const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const propertyRoutes = require('./routes/propertyRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});

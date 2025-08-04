// seedAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/user');

// ⚠️ Make sure your .env file has: MONGO_URI = your MongoDB connection string
const MONGO_URI = process.env.MONGO_URI;

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');

    const existingUser = await User.findOne({ email: 'admin@geoestate.com' });
    if (existingUser) {
      console.log('⚠️ Admin user already exists');
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const newAdmin = new User({
      name: 'Geo Admin',
      email: 'admin@geoestate.com',
      password: hashedPassword,
      isAdmin: true,
    });

    await newAdmin.save();
    console.log('✅ Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
}

createAdmin();

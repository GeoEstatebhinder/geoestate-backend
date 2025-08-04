const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');

const MONGO_URI = 'mongodb+srv://bhindergeoestate:Karamjitkaur1%40@geoestate-cluster.2g2jmxn.mongodb.net/geoestate?retryWrites=true&w=majority'
; // or use process.env.MONGO_URI

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected');

    const existing = await User.findOne({ email: 'admin@geoestate.com' });
    if (existing) {
      await User.deleteOne({ email: 'admin@geoestate.com' });
      console.log('Deleted old admin');
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new User({
      name: 'Geo Admin',
      email: 'admin@geoestate.com',
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();
    console.log('✅ New admin created with password: admin123');
    process.exit();
  })
  .catch(err => {
    console.error('MongoDB Error:', err);
  });

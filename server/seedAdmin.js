require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/artivo_art');
    
    const adminExists = await User.findOne({ email: 'admin@artivospace.com' });
    if (adminExists) {
      console.log('Admin already exists!');
      process.exit();
    }

    await User.create({
      name: 'Admin User',
      email: 'admin@artivospace.com',
      password: 'adminpassword123',
      role: 'admin'
    });

    console.log('Admin user created successfully!');
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

seedAdmin();

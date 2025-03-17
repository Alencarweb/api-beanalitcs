import mongoose from 'mongoose';
import User from '../models/User.js';
import 'dotenv/config';
const createUser = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/beanalitcs', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const newUser = new User({
      username: 'emdiaes',
      password: 'EmdiaES#1980#3004#1969#', 
    });

    await newUser.save();
    console.log('User created successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating user:', error);
    mongoose.connection.close();
  }
};

createUser();
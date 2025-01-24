// Import Mongoose
const mongoose = require('mongoose');

// MongoDB Connection String
const mongoURI = 'mongodb://127.0.0.1:27017/shopping-website'; // Replace 'testdb' with your database name


// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));

// Define a Mongoose Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    inStock: Boolean,
    image: String,
    description: String,
    currency: String
});

// Create a Mongoose Model
const Product = mongoose.model('electronic_items', productSchema);

// Dummy Data
const dummyData = [
    {
        name: 'Smartphone',
        price: 699,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1678733404886-f6c9551cd283?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Latest smartphones with cutting-edge technology.',
        currency: 'USD'
    },
    {
        name: 'Laptop',
        price: 1299,
        inStock: true,
        image: 'https://plus.unsplash.com/premium_photo-1681160405580-a68e9c4707f9?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'High-performance laptops for work and gaming.',
        currency: 'USD'
    },
    {
        name: 'Wireless Headphones',
        price: 199,
        inStock: false,
        image: 'https://plus.unsplash.com/premium_photo-1677838847721-2bf14b48c256?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Experience crystal-clear sound and comfort.',
        currency: 'USD'
    },
    {
        name: 'Smart TV',
        price: 999,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1601944177325-f8867652837f?q=80&w=2077&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Enjoy your favorite shows in stunning 4K resolution.',
        currency: 'USD'
    },
    {
        name: 'Gaming Console',
        price: 499,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1580234797602-22c37b2a6230?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Next-gen gaming with immersive experiences.',
        currency: 'USD'
    },
];

// Insert Dummy Data into MongoDB
const insertDummyData = async () => {
    try {
        await Product.insertMany(dummyData);
        console.log('Dummy data inserted successfully!');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    } finally {
        mongoose.connection.close(); // Close the connection after insertion
    }
};

// Run the function
insertDummyData();

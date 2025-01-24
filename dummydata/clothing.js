// Import Mongoose
const mongoose = require('mongoose');

// MongoDB Connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/shopping-website'; // Replace 'testdb' with your database name

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));

// Define a Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    inStock: Boolean,
    image: String,
    description: String,
    currency: String,
});

// Create a Model
const Product = mongoose.model('clothing_items', productSchema);

// Dummy Data for Seeding Clothing Products
const clothingData = [
    {
        name: 'Summer Dress',
        price: 29.99,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Elegant and trendy summer wear.',
        currency: 'USD'
    },
    {
        name: 'Men\'s Suit',
        price: 149.99,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?q=80&w=1870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Sharp suits for formal occasions.',
        currency: 'USD'
    },
    {
        name: 'Sportswear',
        price: 39.99,
        inStock: true,
        image: 'https://media.istockphoto.com/id/1420515189/photo/exercise-workout-and-training-with-a-healthy-man-training-for-sport-fitness-and-wellness.jpg?s=1024x1024&w=is&k=20&c=w4vINZvMejYYN11E-Ofdwu0eG5v5BO6KxX8LEhWjfVg=',
        description: 'Comfortable and stylish activewear.',
        currency: 'USD'
    },
    {
        name: 'Hoodie',
        price: 49.99,
        inStock: true,
        image: 'https://plus.unsplash.com/premium_photo-1673125510222-1a51e3a8ccb0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Casual hoodies for everyday wear.',
        currency: 'USD'
    },
];

// Seeder Function to Insert Dummy Clothing Data
const seedClothingDatabase = async () => {
    try {
        // Clear existing data before seeding (optional)
        await Product.deleteMany({});

        // Insert clothing data into the database
        await Product.insertMany(clothingData);
        console.log('Clothing dummy data seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close(); // Close the connection after seeding
    }
};

// Run the Seeder Function
seedClothingDatabase();

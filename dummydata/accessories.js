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
const Product = mongoose.model('accessories-items', productSchema);

// Dummy Data for Seeding Accessories Products
const accessoriesData = [
    {
        name: 'Watches',
        price: 89.99,
        inStock: true,
        image: 'https://img.freepik.com/free-vector/classic-watches-interface_250435-185.jpg',
        description: 'Classic and stylish watches to complement your look.',
        currency: 'USD'
    },
    {
        name: 'Leather Belts',
        price: 49.99,
        inStock: true,
        image: 'https://img.freepik.com/premium-photo/leather-brown-belt_144962-3327.jpg',
        description: 'Premium leather belts to add style and durability.',
        currency: 'USD'
    },
    {
        name: 'Sunglasses',
        price: 29.99,
        inStock: true,
        image: 'https://img.freepik.com/free-photo/sunglasses_1203-7884.jpg',
        description: 'Protect your eyes and stay stylish with our sunglasses.',
        currency: 'USD'
    },
    {
        name: 'Bracelets',
        price: 19.99,
        inStock: true,
        image: 'https://img.freepik.com/free-photo/vertical-closeup-shot-male-wearing-silver-bracelet-with-his-hands-pockets_181624-21954.jpg',
        description: 'Elegant bracelets for a sophisticated look.',
        currency: 'USD'
    },
    {
        name: 'Wallets',
        price: 59.99,
        inStock: true,
        image: 'https://img.freepik.com/premium-photo/high-angle-view-wallet-hardwood-floor_1048944-22290496.jpg',
        description: 'Functional and stylish wallets for everyday use.',
        currency: 'USD'
    },
];

// Seeder Function to Insert Dummy Accessories Data
const seedAccessoriesDatabase = async () => {
    try {
        // Clear existing data before seeding (optional)
        await Product.deleteMany({});

        // Insert accessories data into the database
        await Product.insertMany(accessoriesData);
        console.log('Accessories dummy data seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close(); // Close the connection after seeding
    }
};

// Run the Seeder Function
seedAccessoriesDatabase();

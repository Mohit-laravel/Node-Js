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
const Product = mongoose.model('home_appliance_items', productSchema);

// Dummy Data for Seeding Appliance Products
const applianceData = [
    {
        name: 'Washing Machine',
        price: 499.99,
        inStock: true,
        image: 'https://img.freepik.com/premium-photo/woman-tired-after-doing-laundry-isolated-white_85869-3369.jpg?w=1380',
        description: 'Efficient and quick washing for your clothes.',
        currency: 'USD'
    },
    {
        name: 'Refrigerator',
        price: 799.99,
        inStock: true,
        image: 'https://img.freepik.com/premium-photo/home-refrigerator_33900-5882.jpg?w=740',
        description: 'Keep your food fresh with the latest refrigerators.',
        currency: 'USD'
    },
    {
        name: 'Blender',
        price: 129.99,
        inStock: true,
        image: 'https://img.freepik.com/premium-photo/shot-smoothie-glass-placed-colorful-yoga-mat-with-exercise-props-around-it_198067-300106.jpg?w=1380',
        description: 'Perfect for smoothies, soups, and more!',
        currency: 'USD'
    },
    {
        name: 'Coffee Machine',
        price: 199.99,
        inStock: true,
        image: 'https://img.freepik.com/premium-photo/fresh-coffee-espresso-coffee-machine-wooden-table_123827-6514.jpg?w=1380',
        description: 'Start your day with a fresh cup of coffee.',
        currency: 'USD'
    },
    {
        name: 'Air Conditioner',
        price: 299.99,
        inStock: true,
        image: 'https://img.freepik.com/free-psd/3d-rendering-hotel-icon_23-2150102380.jpg?t=st=1737538107~exp=1737541707~hmac=46110883fa3f28d45845a1538fca43433c8def0022666cf3134656a569121438&w=826',
        description: 'Stay cool with energy-efficient air conditioners.',
        currency: 'USD'
    },
];

// Seeder Function to Insert Dummy Appliance Data
const seedApplianceDatabase = async () => {
    try {
        // Clear existing data before seeding (optional)
        await Product.deleteMany({});

        // Insert appliance data into the database
        await Product.insertMany(applianceData);
        console.log('Appliance dummy data seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close(); // Close the connection after seeding
    }
};

// Run the Seeder Function
seedApplianceDatabase();

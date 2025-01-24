// Import Mongoose
const mongoose = require('mongoose');

// Define a Product Schema specifically for Accessories
const accessorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    currency: { type: String, required: true },
});

// Create a Model for Accessories
const Clothing = mongoose.model('clothing_items', accessorySchema);

// Export the model
module.exports = Clothing;

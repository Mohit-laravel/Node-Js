// controllers/ProductController.js
const homeAppliance = require("../models/appliance");
const Electronics = require("../models/electronics");
const Clothing = require("../models/clothing");
const Accessories = require("../models/accessories");

class CategoriesController {
    async  getHomeAppliances(req, res) {
        try {
            const homeAppliances = await homeAppliance.find({});
            res.render('home-appliances', { homeAppliances, user: req.user });
        } catch (err) {
            res.status(500).send('Error fetching home appliances.');
        }
    }

    async getElectronicItems(req, res) {
        try {
            const electronics = await Electronics.find({});
            res.render('electronics', { electronics, user: req.user });
        } catch (err) {
            res.status(500).send('Error fetching electronics.');
        }
    }

    async getClothingItems(req, res) {
        try {
            const clothing = await Clothing.find({});
            res.render('clothing', { clothing, user: req.user });
        } catch (err) {
            res.status(500).send('Error fetching clothing.');
        }
    }

    async getAccessoriesItems(req, res) {
        try {
            const accessories = await Accessories.find({});
            res.render('accessories', { accessories, user: req.user });
        } catch (err) {
            res.status(500).send('Error fetching accessories.');
        }
    }

    async checkout(req, res) {
        console.log('here')
        const { id, name, description, price, currency, rating, image } = JSON.parse(req.query._doc);
        res.render('checkout', {
            id, name, description, price, currency, rating, image, user: req.user
        });
    }

    async getCategoryById(req, res) {
        try {
            const { category, id: productId } = req.params; // Extract category and product ID from URL
        
            // Map categories to their respective models
            const categoryModelMap = {
              accessories: Accessories,
              electronics: Electronics,
              clothing: Clothing,
              appliances:homeAppliance
              // Add more categories as needed
            };
        
            // Get the corresponding model
            const ProductModel = categoryModelMap[category];
            if (!ProductModel) {
              return res.status(404).send('Invalid category'); // Handle unknown categories
            }
        
            // Fetch product by ID
            const product = await ProductModel.findById(productId);
        
            if (!product) {
              return res.status(404).send('Product not found');
            }
        
            // Render the product detail page with the fetched product
            res.render('product-detail', { product , user: req.user,currentUrl: req.originalUrl});
          } catch (err) {
            console.error(err);
            res.status(500).send('Error fetching product details');
          }
    }
}

module.exports = new CategoriesController(); // Exporting an instance of the class

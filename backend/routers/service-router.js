const express=require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const router=express.Router();

const menu = [
    { id: 1, item: "Burger", price: 5.99 },
    { id: 2, item: "Pizza", price: 8.99 },
    { id: 3, item: "Pasta", price: 7.49 },
    { id: 4, item: "Coffee", price: 2.99 },
    { id: 5, item: "Sandwich", price: 4.49 }
];

router.get('/canteen', function(req, res) {
    res.json({
        message: "Welcome to the Canteen!",
        menu: menu
    });
});


// Store orders by user ID (For production, use a database)
let userOrders = {};

// Route to get orders for a specific user by ID
router.get('/canteen/:id/orders', function(req, res) {
    const userId = req.params.id;

    // Check if the user has placed any orders
    if (!userOrders[userId] || userOrders[userId].length === 0) {
        return res.status(404).json({
            message: `No orders found for user with ID: ${userId}`
        });
    }

    res.json({
        message: `Orders for user with ID: ${userId}`,
        orders: userOrders[userId]
    });
});

// Route to place an order for a specific user by ID
router.post('/canteen/:id/order', function(req, res) {
    const userId = req.params.id;
    const { itemId, quantity } = req.body;

    // Find the menu item by ID
    const menuItem = menu.find(item => item.id === itemId);
    if (!menuItem) {
        return res.status(404).json({ error: "Item not found" });
    }

    // Create a new order for the user
    const order = {
        id: userOrders[userId] ? userOrders[userId].length + 1 : 1,
        item: menuItem.item,
        quantity: quantity,
        total: (menuItem.price * quantity).toFixed(2)
    };

    // Store the order for the user
    if (!userOrders[userId]) {
        userOrders[userId] = [];
    }
    userOrders[userId].push(order);

    res.json({
        message: `Order placed successfully for user ${userId}`,
        order: order
    });
});

module.exports = router;

router.post('/canteen/:id/orders', function(req, res){
    res.send(`Creating an order for user with id ${req.params.id}`);
});

// New Canteen APIs
router.get('/canteen/menu', function(req, res) {
    res.send('List of menu items');
});

router.post('/canteen/order', function(req, res) {
    res.send('Order placed successfully');
});

router.get('/canteen/order/:id', function(req, res) {
    res.send(`Order status for order ID: `);
});

router.delete('/canteen/order/:id', function(req, res) {
    res.send(`Order cancelled for order ID: `);
});

// Printing APIs
router.get('/printing', function(req, res) {
    res.send('Welcome to Printing Service');
});


// Product APIs
router.get('/products', function(req, res) {
    res.send('List of products from product collection');
});

// Add a product with service provider ID
router.post('/products/:serviceProviderId', async function(req, res) {
    try {
        const product = new Product({
            ...req.body,
            serviceProviderId: req.params.serviceProviderId
        });
        await product.save();
        res.send('Product added successfully with service provider ID');
    } catch (error) {
        res.status(500).send('Error adding product with service provider ID');
    }
});
router.get('/products/:id', function(req, res) {
    res.send(`Details of product with ID: ${req.params.id}`);
});


// Define a schema for the files
const fileSchema = new mongoose.Schema({
    filename: String,
    contentType: String,
    data: Buffer,
    uploadedAt: { type: Date, default: Date.now }
});

// Create a model for the files
const File = mongoose.model('File', fileSchema);

// Endpoint to handle file upload
router.post('/printing/upload', upload.single('file'), async function(req, res) {
    try {
        const file = new File({
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            data: req.file.buffer
        });
        await file.save();
        res.send('Document uploaded for printing and stored in database');
    } catch (error) {
        res.status(500).send('Error uploading file');
    }
});

router.get('/printing/status/:id', function(req, res) {
    res.send(`Print status for request ID:`);
});

router.delete('/printing/:id', function(req, res) {
    res.send(`Print request cancelled for ID:`);
});

module.exports=router;

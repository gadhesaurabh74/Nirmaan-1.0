const express=require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const router=express.Router();

router.get('/', function(req, res){
    res.send("This is the users page");
});

router.get('/canteen', function(req, res){
    res.send(`This is the user with canteen`);
});

router.get('/canteen/:id/orders', function(req, res){
    res.send(`This is the orders for user with id ${req.params.id}`);
});

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

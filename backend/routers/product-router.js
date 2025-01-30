const express = require('express');
const router = express.Router();



// Canteen products router
const canteenProducts = [
    { id: 1, name: 'Sandwich', price: 50 },
    { id: 2, name: 'Coffee', price: 30 },
    { id: 3, name: 'Tea', price: 20 }
];

router.get('/canteen/products', function(req, res) {
    res.json(canteenProducts);
});

// Printing products route
const printingProducts = [
    { id: 1, type: 'Business Cards', charges: 200 },
    { id: 2, type: 'Flyers', charges: 150 },
    { id: 3, type: 'Posters', charges: 300 }
];

router.get('/printing/products', function(req, res) {
    res.json(printingProducts);
});
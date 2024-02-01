const express = require('express');
const router =  express.Router();


const {Product} = require('../models/product')
const {Variant} = require('../models/variant')



// Get all products
router.get('/', async (req, res) => {
    try {
        const productsList = await Product.find().populate('variants');
        
        if (!productsList) {
            return res.status(500).json({ success: false, description: 'Internal Server Error' });
        }
        
        res.status(200).json(productsList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, description: 'Internal Server Error' });
    }
});


// Search for products by name, description, or variant name

router.get('/search/', async (req, res) => {
    try {
        const query = req.query.q; 

        const regexQuery = new RegExp(query, 'i');

        const productsList = await Product.find({
            $or: [
                { name: { $regex: regexQuery } },
                { description: { $regex: regexQuery } },
                { 'variants.name': { $regex: regexQuery } },
            ],
        }).populate('variants');

        res.status(200).json(productsList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


// creating a new product

router.post(`/`, async(req, res) => {
    const { name, description, price } = req.body;

    const product = new Product({
        name: name,
        description: description,
        price: price,
        variants: [],
    });

    product.save().then((createdProduct => {
        res.status(201).json(createdProduct);
    }
    )).catch((err) => {
        res.status(500).json({
            error: err,
            success: false,
        });
    });
        });


// deleting a product and its variants

router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId).populate('variants');

        if (!product) {
            return res.status(404).json({ success: false, description: 'Product not found' });
        }

        for (const variantId of product.variants) {
            await Variant.findByIdAndDelete(variantId);
        }

        const removedProduct = await Product.findByIdAndDelete(productId);

        if (removedProduct) {
            res.status(200).json({ success: true, description: 'Deleted Successfully' });
        } else {
            res.status(500).json({ success: false, description: 'Error While Deleting' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, description: 'Internal Server Error' });
    }
});

// Update a product by ID

router.put('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, description, price } = req.body;

        // Find the product by ID and update its fields
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name: name,
            description: description,
            price: price,
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, description: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
});


module.exports = router;
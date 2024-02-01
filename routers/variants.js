const express = require('express');
const router =  express.Router();


const {Product} = require('../models/product')
const {Variant} = require('../models/variant')


// creating a new product

router.post('/', async (req, res) => {
    try {
        const { productId, name, sku, additionalPrice, stockCount } = req.body;

        const variant = new Variant({
            productId: productId,
            name: name,
            sku: sku,
            additionalPrice: additionalPrice,
            stockCount: stockCount,
        });

        const createdVariant = await variant.save();

        await Product.findByIdAndUpdate(productId, { $push: { variants: createdVariant._id } });

        res.status(201).json(createdVariant);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
});



// Update a variant by ID

router.put('/:id', async (req, res) => {
    try {
        const variantId = req.params.id;
        const { name, sku, additionalPrice, stockCount } = req.body;

        const updatedVariant = await Variant.findByIdAndUpdate(variantId, {
            name: name,
            sku: sku,
            additionalPrice: additionalPrice,
            stockCount: stockCount,
        }, { new: true });

        if (!updatedVariant) {
            return res.status(404).json({ success: false, description: 'Variant not found' });
        }

        res.status(200).json(updatedVariant);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
});


// delete the variant by ID

router.delete('/:id', async (req, res) => {
    try {
        const variantId = req.params.id;

        const deletedVariant = await Variant.findByIdAndDelete(variantId);

        if (!deletedVariant) {
            return res.status(404).json({ success: false, description: 'Variant not found' });
        }

        const productId = deletedVariant.productId;
        await Product.findByIdAndUpdate(productId, { $pull: { variants: variantId } });

        res.status(200).json({ success: true, description: 'Deleted Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
});

module.exports = router;
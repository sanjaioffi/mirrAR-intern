const assert = require('assert');
const mongoose = require('mongoose');


const { Product } = require('../models/product');
const { Variant } = require('../models/variant');


beforeEach(async () => {
  await Product.deleteMany({});
  await Variant.deleteMany({});
});


after(async () => {
  await mongoose.connection.close();
});

describe('Models Tests', () => {
  it('should create and retrieve a product', async () => {

    const productData = { name: 'TestProduct', description: 'TestDescription', price: 20 };
    const createdProduct = await Product.create(productData);


    const retrievedProduct = await Product.findById(createdProduct._id);


    assert.deepStrictEqual(retrievedProduct.toObject(), createdProduct.toObject());
  });

  it('should create and retrieve a variant', async () => {

    const productData = { name: 'TestProduct', description: 'TestDescription', price: 20 };
    const createdProduct = await Product.create(productData);


    const variantData = { productId: createdProduct._id, name: 'TestVariant', sku: 'ABC123', additionalPrice: 10, stockCount: 50 };
    const createdVariant = await Variant.create(variantData);


    const retrievedVariant = await Variant.findById(createdVariant._id);

  
    assert.deepStrictEqual(retrievedVariant.toObject(), createdVariant.toObject());
  });
});

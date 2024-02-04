// const assert = require('assert');
// const supertest = require('supertest');
// const app = require('../app'); // Adjust the path based on your project structure
// const mongoose = require('mongoose');

// const request = supertest(app);

// const { Product } = require('../models/product');
// const { Variant } = require('../models/variant');

// beforeEach(async () => {
//   await Product.deleteMany({});
//   await Variant.deleteMany({});
// });

// after(async () => {
//   await mongoose.connection.close();
// });

// const createFakeProduct = async (productData) => {
//   return await Product.create(productData);
// };

// const createFakeVariant = async (variantData) => {
//   return await Variant.create(variantData);
// };

// describe('Product Search Tests', () => {
//   it('should search for a product by name, description, or variant name', async () => {
//     // Create a product with associated variants
//     const fakeProduct = { name: 'SearchableProduct', description: 'Searchable Description', price: 50 };
//     const createdProduct = await createFakeProduct(fakeProduct);

//     const fakeVariant = { productId: createdProduct._id, name: 'SearchableVariant', sku: 'SV123', additionalPrice: 15, stockCount: 30 };
//     await createFakeVariant(fakeVariant);

//     // Perform a search query
//     const searchQuery = 'Searchable';

//     // Make the request to the search endpoint
//     const response = await request.get(`/api/v1/products/search?q=${searchQuery}`).expect(200);

//     // Assert that the search results include the expected product
//     assert.strictEqual(response.body.length, 1);
//     const resultProduct = response.body[0];

//     assert.strictEqual(resultProduct.name, fakeProduct.name);
//     assert.strictEqual(resultProduct.description, fakeProduct.description);
//     assert.strictEqual(resultProduct.price, fakeProduct.price);

//     // Assert that the variants are also included in the result
//     assert.strictEqual(resultProduct.variants.length, 1);
//     const resultVariant = resultProduct.variants[0];

//     // assert.strictEqual(resultVariant.name, fakeVariant.name);
//     // assert.strictEqual(resultVariant.sku, fakeVariant.sku);
//     // assert.strictEqual(resultVariant.additionalPrice, fakeVariant.additionalPrice);
//     // assert.strictEqual(resultVariant.stockCount, fakeVariant.stockCount);
//   });

// //   it('should handle no matching results', async () => {
// //     // Perform a search query with no matching results
// //     const searchQuery = 'NonExistent';

// //     // Make the request to the search endpoint
// //     const response = await request.get(`/api/v1/products/search?q=${searchQuery}`).expect(200);

// //     // Assert that the search results are empty
// //     assert.strictEqual(response.body.length, 0);
// //   });
// });

// const assert = require('assert');
// const supertest = require('supertest');
// const app = require('../app'); // Adjust the path based on your project structure
// const mongoose = require('mongoose');

// const request = supertest(app);

// // Import the models
// const { Product } = require('../models/product');
// const { Variant } = require('../models/variant');

// // Clear the collections before running tests
// beforeEach(async () => {
//   await Product.deleteMany({});
//   await Variant.deleteMany({});
// });

// // Close the database connection after running tests
// after(async () => {
//   await mongoose.connection.close();
// });

// const createFakeProduct = async (productData) => {
//   return await Product.create(productData);
// };

// describe('Search Tests - Products', () => {
//   it('should search for products by name, description, or variant name', async () => {
//     const fakeProducts = [
//       { name: 'TestProduct1', description: 'Description1', price: 10 },
//       { name: 'TestProduct2', description: 'Description2', price: 15 },
//     ];
//     const createdProducts = await Product.insertMany(fakeProducts);

//     const fakeVariant = {
//       productId: createdProducts[0]._id,
//       name: 'TestVariant',
//       sku: 'ABC123',
//       additionalPrice: 5,
//       stockCount: 50,
//     };
//     await Variant.create(fakeVariant);

//     // Search by name
//     const searchQueryByName = 'TestProduct1';
//     const responseByName = await request
//       .get(`/api/v1/products/search?q=${searchQueryByName}`)
//       .expect(200);

//     const expectedProductByName = {
//       __v: 0,
//       _id: responseByName.body[0]?._id,
//       description: fakeProducts[0].description,
//       name: fakeProducts[0].name,
//       price: fakeProducts[0].price,
//       variants: [],
//     };

//     assert.deepStrictEqual(responseByName.body, [expectedProductByName]);

//     // Search by description
//     const searchQueryByDescription = 'Description2';
//     const responseByDescription = await request
//       .get(`/api/v1/products/search?q=${searchQueryByDescription}`)
//       .expect(200);

//     const expectedProductByDescription = {
//       __v: 0,
//       _id: responseByDescription.body[0]?._id,
//       description: fakeProducts[1].description,
//       name: fakeProducts[1].name,
//       price: fakeProducts[1].price,
//       variants: [],
//     };

//     assert.deepStrictEqual(responseByDescription.body, [expectedProductByDescription]);

//     // Search by variant name
//     const searchQueryByVariantName = 'TestVariant';
//     const responseByVariantName = await request
//       .get(`/api/v1/products/search?q=${searchQueryByVariantName}`)
//       .expect(200);

//     const expectedProductByVariantName = {
//       __v: 0,
//       _id: responseByVariantName.body[0]?._id,
//       description: fakeProducts[0].description,
//       name: fakeProducts[0].name,
//       price: fakeProducts[0].price,
//       variants: [],
//     };

//     assert.deepStrictEqual(responseByVariantName.body, [expectedProductByVariantName]);
//   });
// });

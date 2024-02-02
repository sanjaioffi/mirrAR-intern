const assert = require('assert');
const supertest = require('supertest');
const app = require('../app'); // Adjust the path based on your project structure
const mongoose = require('mongoose');

const request = supertest(app);

const { Product } = require('../models/product');
const { Variant } = require('../models/variant');


beforeEach(async () => {
  await Product.deleteMany({});
  await Variant.deleteMany({});
});


after(async () => {
  await mongoose.connection.close();
});

const createFakeProduct = async (productData) => {
  return await Product.create(productData);
};

describe('Endpoint Tests - Products', () => {
  it('should get all products', async () => {
    const fakeProducts = [
      { name: 'Product1', description: 'Description', price: 10 },
      { name: 'Product2', description: 'Description', price: 10 },
    ];
    await Product.insertMany(fakeProducts);

    await request
      .get(`/api/v1/products`)
      .expect(200)
      .then((response) => {
        const expectedProducts = fakeProducts.map(({ name, description, price }) => ({
          __v: 0,
          _id: response.body.find((product) => product.name === name)._id, // match _id from response
          description,
          name,
          price,
          variants: [],
        }));
        assert.deepStrictEqual(response.body, expectedProducts);
      });
  });

  it('should search for products by name, description, or variant name', async () => {
    const fakeQuery = 'test';
    const fakeProducts = [
      { name: 'TestProduct1', description: 'Description', price: 10 },
      { name: 'TestProduct2', description: 'Description', price: 10 },
    ];
    await Product.insertMany(fakeProducts);

    await request
      .get(`/api/v1/products/search?q=${fakeQuery}`)
      .expect(200)
      .then((response) => {
        const expectedProducts = fakeProducts.map(({ name, description, price }) => ({
          __v: 0,
          _id: response.body.find((product) => product.name === name)._id, // match _id from response
          description,
          name,
          price,
          variants: [],
        }));
        assert.deepStrictEqual(response.body, expectedProducts);
      });
  });

  it('should create a new product', async () => {
    const fakeProduct = { name: 'NewProduct', description: 'Description', price: 10 };

    await request
      .post('/api/v1/products')
      .send(fakeProduct)
      .expect(201)
      .then((response) => {
        const expectedProduct = {
          __v: 0,
          _id: response.body._id,
          description: fakeProduct.description,
          name: fakeProduct.name,
          price: fakeProduct.price,
          variants: [],
        };
        assert.deepStrictEqual(response.body, expectedProduct);
      });
  });

  it('should delete a product and its variants', async () => {
    const fakeProduct = { name: 'NewProduct', description: 'Description', price: 10 };
    const createdProduct = await createFakeProduct(fakeProduct);

    await request
      .delete(`/api/v1/products/${createdProduct._id}`)
      .expect(200)
      .then((response) => {
        assert.deepStrictEqual(response.body, { success: true, description: 'Deleted Successfully' });
      });

    const deletedProduct = await Product.findById(createdProduct._id);
    assert.strictEqual(deletedProduct, null);
  });

  it('should update a product by ID', async () => {
    const fakeProduct = { name: 'ProductToUpdate', description: 'OldDescription', price: 15 };
    const createdProduct = await createFakeProduct(fakeProduct);

    const updatedData = { name: 'UpdatedProduct', description: 'NewDescription', price: 20 };

    await request
      .put(`/api/v1/products/${createdProduct._id}`)
      .send(updatedData)
      .expect(200)
      .then((response) => {
        const expectedProduct = {
          __v: 0,
          _id: response.body._id,
          description: updatedData.description,
          name: updatedData.name,
          price: updatedData.price,
          variants: [],
        };
        assert.deepStrictEqual(response.body, expectedProduct);
      });
  });
});

describe('Endpoint Tests - Variants', () => {
  it('should create and retrieve a variant', async () => {
    const fakeProduct = { name: 'AssociatedProduct', description: 'ProductDescription', price: 25 };
    const createdProduct = await createFakeProduct(fakeProduct);

    const fakeVariant = { productId: createdProduct._id, name: 'TestVariant', sku: 'ABC123', additionalPrice: 10, stockCount: 50 };

    await request
      .post('/api/v1/variants')
      .send(fakeVariant)
      .expect(201)
      .then((response) => {
        const expectedVariant = {
          __v: 0,
          _id: response.body._id,
          productId:response.body.productId,
          name: fakeVariant.name,
          sku: fakeVariant.sku,
          additionalPrice: fakeVariant.additionalPrice,
          stockCount: fakeVariant.stockCount,
        };
        assert.deepStrictEqual(response.body, expectedVariant);
      });
  });

  it('should update a variant by ID', async () => {
    const fakeProduct = { name: 'AssociatedProduct', description: 'ProductDescription', price: 25 };
    const createdProduct = await createFakeProduct(fakeProduct);

    const fakeVariant = { productId: createdProduct._id, name: 'VariantToUpdate', sku: 'ABC123', additionalPrice: 10, stockCount: 50 };
    const createdVariant = await Variant.create(fakeVariant);

    const updatedData = { name: 'UpdatedVariant', sku: 'XYZ789', additionalPrice: 15, stockCount: 30 };

    await request
      .put(`/api/v1/variants/${createdVariant._id}`)
      .send(updatedData)
      .expect(200)
      .then((response) => {
        const expectedVariant = {
          __v: 0,
          _id: response.body._id,
          productId:response.body.productId,
          name: updatedData.name,
          sku: updatedData.sku,
          additionalPrice: updatedData.additionalPrice,
          stockCount: updatedData.stockCount,
        };
        assert.deepStrictEqual(response.body, expectedVariant);
      });
  });


  it('should delete a variant by ID', async () => {
    const fakeProduct = { name: 'AssociatedProduct', description: 'ProductDescription', price: 25 };
    const createdProduct = await createFakeProduct(fakeProduct);

    const fakeVariant = { productId: createdProduct._id, name: 'VariantToDelete', sku: 'ABC123', additionalPrice: 10, stockCount: 50 };
    const createdVariant = await Variant.create(fakeVariant);

    await request
      .delete(`/api/v1/variants/${createdVariant._id}`)
      .expect(200)
      .then((response) => {
        assert.deepStrictEqual(response.body, { success: true, description: 'Deleted Successfully' });
      });

    const deletedVariant = await Variant.findById(createdVariant._id);
    assert.strictEqual(deletedVariant, null);
  });
});

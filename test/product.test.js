import { expect } from 'chai';

const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust the path accordingly
const Product = require('../models/product'); // Adjust the path accordingly

chai.use(chaiHttp);


describe('Product Model', () => {
  before((done) => {
    mongoose.connect(process.env.CONNECTION_STRING, { }, () => {
      mongoose.connection.db.dropDatabase();
      done();
    });
  });

  after((done) => {
    mongoose.connection.close();
    done();
  });

  it('should save a product', (done) => {
    const product = new Product({
      name: 'Test Product',
      description: 'Test Description',
      price: 19.99,
    });

    product.save((err, savedProduct) => {
      expect(err).to.be.null;
      expect(savedProduct).to.have.property('name').to.equal('Test Product');
      done();
    });
  });

  it('should retrieve products from the database', (done) => {
    Product.find({}, (err, products) => {
      expect(err).to.be.null;
      expect(products).to.have.lengthOf(1); // Assuming one product is saved in the previous test
      done();
    });
  });
});

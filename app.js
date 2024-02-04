const express = require('express'); // to create the server
const bodyParser = require('body-parser'); // to parse the data from the body
const morgan = require('morgan'); // to log the data in the console
const mongoose = require('mongoose'); // to connect to the database
const cors = require('cors');
const swaggerjsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');



const app = express(); 
const port = 3000;

app.use(cors());
app.options('*',cors());



// access to the .env file
require('dotenv/config'); 
const api = process.env.API_URL;


// middleware for parsing 
app.use(bodyParser.json());  
app.use(morgan('tiny')); 


// routers
const productsRouter = require('./routers/products');
const variantsRouter = require('./routers/variants');

app.use(`${api}/products`,productsRouter)
app.use(`${api}/variants`,variantsRouter)



// database connection
mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: 'mirrARProducts',
}).then(() => {
    console.log('Database connection is ready...');
}).catch((err) => {
    console.log(err);
})

const options = {
    definition:{
        openapi: '3.0.0',
        info:{
            title: 'mirrAR Products API',
            version: '1.0.0',
            description: 'A simple Express Library API'
        }, 
        servers: [
            {url:"http://localhost:3000/api/v1"}],
    },
    apis: ['./routers/*.js']
}

const spacs = swaggerjsdoc(options)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(spacs))


app.listen(port, () => {
    console.log(api);
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;

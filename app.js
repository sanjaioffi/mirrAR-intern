const express = require('express'); // to create the server
const bodyParser = require('body-parser'); // to parse the data from the body
const morgan = require('morgan'); // to log the data in the console
const mongoose = require('mongoose'); // to connect to the database
const cors = require('cors');


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


app.listen(port, () => {
    console.log(api);
  console.log(`Server running on http://localhost:${port}`);
});
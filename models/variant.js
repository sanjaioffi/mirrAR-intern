const mongoose = require('mongoose');

const variantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sku:{
        type: String,
        required: true,
    },
    additionalPrice:Number,
    stockCount: {
        type: Number,
        required: true,
    },
});

exports.Variant = mongoose.model('Variant', variantSchema);


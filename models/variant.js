const mongoose = require('mongoose');

const variantSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
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


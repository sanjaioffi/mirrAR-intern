const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }],
});


exports.Product = mongoose.model('Product', productSchema);


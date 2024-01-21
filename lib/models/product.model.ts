import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true},
    title: { type: String, required: true},
    price: { type: Number, required: true},
    imageUrl: { type: String },
}, {timestamps: false})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
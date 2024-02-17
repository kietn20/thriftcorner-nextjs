import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true},
    title: { type: String, required: true},
    price: { type: String, required: true},
    imageUrl: { type: String },
}, {timestamps: true})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
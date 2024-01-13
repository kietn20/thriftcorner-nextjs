import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true},
    title: { type: String, required: true},
    price: { type: Number, required: true},
    seller: { type: String, required: true},
    sellerPfp: { type: String, required: true},
    sold: { type: Number, required: true},
    rating: { type: String, required: true},
    condition: { type: String, required: true},
    freeShipping: { type: Boolean, required: true},
    freeReturns: { type: Boolean, required: true },
    discount: { type: String || Boolean, required: true },
    imageUrl: { type: String, required: true },
    imageUrls: { type: [String], required: true}
}, {timestamps: true})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
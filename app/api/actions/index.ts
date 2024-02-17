"use server"
import Product from "../../../lib/models/product.model";
import mongoose from "mongoose";

export async function getProductById(productId: string) {
	try {
		// connectToDB()
		const product = await Product.findOne({ _id: productId});
		if (!product) return null;
		await mongoose.connection.close()

		return product
	} catch (error) {
		console.log(error)
	}
}

export async function getAllProducts() {
	try {
		// connectToDB();

		const products = await Product.find()
		return JSON.parse(JSON.stringify(products))
	} catch (error) {
		console.log(error)
	}
}
"use server"
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB, deleteCollection } from "../mongoose";
import { scrapeProducts } from "../scraper";

export async function scrapeAndStoreProduct(searchQuery: string) {
	if (!searchQuery) return;

	try {
		// deleteCollection();
		connectToDB();

		var scrapedProducts = await scrapeProducts(searchQuery);
		if (!scrapedProducts) return;

		scrapedProducts.forEach(async (product) => {
			const newProduct = await Product.findOneAndUpdate(
				{ url: product.url },
				product,
				{ upsert: true, new: true }
			);
			revalidatePath(`/products/${newProduct._id}`)
		});
	} catch (error: any) {
		throw new Error(`Failed to create/update product: ${error.message}`);
	}
}

export async function getProductById(productId: string) {
	try {
		connectToDB()

		const product = await Product.findOne({ _id: productId});
		if (!product) return null;

		return product
	} catch (error) {
		console.log(error)
	}
}

export async function getAllProducts() {
	try {
		connectToDB();

		const products = await Product.find()
		return JSON.parse(JSON.stringify(products))
	} catch (error) {
		console.log(error)
	}
}
"use server"

import { connectToDB } from "../mongoose";
import { scrapeProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return;

    try {
        connectToDB();

        const scrapedProduct = await scrapeProduct(productUrl)

        
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}
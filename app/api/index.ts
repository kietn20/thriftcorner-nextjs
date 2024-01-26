"use server";
import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose";
import mongoose, { mongo } from "mongoose";
const { chromium } = require("playwright");

// const chromium = require("@sparticuz/chromium");

// async function getBrowserInstance() {
// 	// if (process.env.NODE_ENV === "development") {
// 	// 	// run locally
// 	// 	console.log("RUNNING LOCALLY !!!");
// 	// 	const puppeteer = require("puppeteer");
// 	// 	return puppeteer.launch({
// 	// 		args: chromium.args,
// 	// 		headless: "new",
// 	// 		ignoreHTTPSErrors: true,
// 	// 		ignoreDefaultArgs: ["--disable-extensions"],
// 	// 	});
// 	// }
// 	// const puppeteer = require("puppeteer-core");
// 	// console.log("RUNNING ON PRODUCTION !!!");
// 	// return await puppeteer.launch({
// 	// 	args: chromium.args,
// 	// 	executablePath: await chromium.executablePath(),
// 	// 	headless: chromium.headless,
// 	// });

// 	return await chromium.launch();
// }

export async function scrapeProducts(searchQuery: string) {
	if (!searchQuery) return;

	if (!process.env.MONGODB_URI) return "Missing MONGODB_URI";
	await mongoose.connect(process.env.MONGODB_URI);

	// const browser = await getBrowserInstance();
	const browser = await chromium.launch();
	try {
		const context = await browser.newContext();
		const page = await context.newPage();

		// const page = await browser.newPage();
		const productUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(
			searchQuery
		)}`;
		await page.goto(productUrl);

		// Wait for the results to load
		await page.waitForSelector(".s-item");

		// Extract information from the first 60 product listings
		const productData: any = [];
		const maxProducts = 61;

		while (productData.length < maxProducts) {
			const items = await page.$$(".s-item");

			for (const item of items) {
				const title = await item.$eval(
					".s-item__title",
					(titleElement: any) => titleElement.innerText
				);
				const price = await item.$eval(
					".s-item__price",
					(priceElement: any) => priceElement.innerText
				);
				const url = await item.$eval(
					".s-item__info a",
					(aElement: any) => aElement.href
				);
				const imageUrl = await item.$eval(
					".s-item__image img",
					(imgElement: any) => imgElement.src
				);

				productData.push({ title, price, url, imageUrl });

				if (productData.length === maxProducts) {
					break;
				}
			}

			await Product.deleteMany({});
			await Product.insertMany(productData.slice(1));
			// await Product.insertMany([{url: 'www.google1.com', title: 'dog1', price: 1.89}, {url: 'www.google2.com', title: 'dog2', price: 1.89}, {url: 'www.google3.com', title: 'dog3', price: 1.89}, {url: 'www.google4.com', title: 'dog4', price: 1.89}, {url: 'www.google5.com', title: 'dog5', price: 1.89}, {url: 'www.google6.com', title: 'dog6', price: 1.89}, {url: 'www.google7.com', title: 'dog7', price: 1.89}, {url: 'www.google8.com', title: 'dog8', price: 1.89}, {url: 'www.google9.com', title: 'dog9', price: 1.89}, {url: 'www.google10.com', title: 'dog10', price: 1.89}, {url: 'www.google11.com', title: 'dog11', price: 1.89}, {url: 'www.google12.com', title: 'dog12', price: 1.89}])
		}
	} catch (error: any) {
		throw new Error(`Failed to scrape product: ${error.message}`);
	} finally {
		await browser.close();
	}
}

export async function scrapeAndUpdateOneProduct(product: any) {
	if (!product) return;

	// const browser = await puppeteer.launch({ headless: 'new' });
	try {
		// const browser = await getBrowserInstance();
		const browser = await chromium.launch();
		const page = await browser.newPage();
		await page.goto(product.url);

		let updatedProduct = await page.evaluate(async () => {
			// function delay(ms: number) {
			// 	return new Promise((resolve) => {
			// 		setTimeout(resolve, ms);
			// 	});
			// }
			// Search Seller's data
			const seller = document
				.querySelector(
					".d-stores-info-categories__container__info__section__title"
				)
				?.textContent?.trim();
			const sellerPfp =
				document
					.querySelector(
						".d-stores-info-categories__container__info__image--img"
					)
					?.getAttribute("src") || "didn't work";
			const sellerInfo = [
				...document.querySelectorAll(
					".d-stores-info-categories__container__info__section__item"
				),
			];
			const rating = sellerInfo[0]?.textContent?.trim() || "didnt work";
			const sold = sellerInfo[1]?.textContent?.trim() || "didnt work";

			const images = [
				...document.querySelectorAll(
					".ux-image-grid-container.masonry-211.x-photos-max-view--show > div.ux-image-grid > button"
				),
			];
			// for (const image of images) {
			// 	// image.scrollIntoView();
			// 	await delay(50);
			// }

			let scrapedImageUrls: any[] = [];
			images.map((image) => {
				scrapedImageUrls.push(
					image.querySelector("img")?.getAttribute("data-src") ||
						"didnt work"
				);
			});
			await browser.close();

			return { seller, sellerPfp, sold, rating, scrapedImageUrls };
		});

		// const data = JSON.stringify(updatedProduct, null, 2);
		// fs.writeFileSync("updatedProducts.json", data);

		return updatedProduct;
	} catch (error: any) {
		console.log(`Failed to scrape product: ${error.message} dogggy`);
	} finally {
		console.log("done updating product");
	}
}

// export const config = {
// 	runtime: 'edge',
// }

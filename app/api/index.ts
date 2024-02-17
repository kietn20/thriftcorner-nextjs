"use server";
import Product from "@/lib/models/product.model";
import mongoose from "mongoose";

const chromium = require("@sparticuz/chromium");

async function getBrowserInstance() {
	if (process.env.NODE_ENV === "development") {
		// run locally
		console.log("RUNNING LOCALLY !!!");
		const puppeteer = require("puppeteer");
		return puppeteer.launch({
			args: chromium.args,
			headless: "new",
			ignoreHTTPSErrors: true,
			ignoreDefaultArgs: ["--disable-extensions"],
		});
	}
	const puppeteer = require("puppeteer-core");
	console.log("RUNNING ON PRODUCTION !!!");
	return await puppeteer.launch({
		args: chromium.args,
		executablePath: await chromium.executablePath(),
		headless: chromium.headless,
	});
}

export async function scrapeProducts(searchQuery: string) {
	if (!searchQuery) return;

	if (!process.env.MONGODB_URI) return 'Missing MONGODB_URI'
	await mongoose.connect(process.env.MONGODB_URI)

	const browser = await getBrowserInstance();
	try {
		const page = await browser.newPage();
		const productUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(searchQuery)}`;
		console.log(productUrl)
		await page.goto(productUrl)
		// await page.goto("https://www.ebay.com/");
		// await page.waitForSelector("#gh-ac");
		// await page.type("#gh-ac", searchQuery);
		// await page.click('input[value="Search"]');
		// await page.waitForNavigation();

		var searchData = await page.evaluate(async () => {
			var listOfProducts: any[] = [];

			let selector = "ul > li.s-item";
			for (let i = 1; i <= 51; i++) {
				selector += `:is([data-gr4="${i}"]), `;
			}

			// Remove the trailing comma and space
			selector = selector.slice(0, -2);

			const elements = document.querySelectorAll(selector);
			elements.forEach((element, index) => {
				listOfProducts.push({
					title: element
							.querySelector(".s-item__title")
							?.textContent?.trim(),
					price: parseFloat(
						element
							.querySelector("span.s-item__price")
							?.textContent?.trim()
							.replace("$", "") || ""),
					condition: element
						.querySelector("span.SECONDARY_INFO")
						?.textContent?.trim(),
					freeShipping:
					element
							.querySelector("span.s-item__shipping")
							?.textContent?.trim() === "Free shipping",
					freeReturns:
					element
							.querySelector("span.s-item__free-returns")
							?.textContent?.trim() === "Free returns",
					discount:
					element
							.querySelector("span.NEGATIVE")
							?.textContent?.trim() || false,
					url: element
						.querySelector("a.s-item__link")
						?.getAttribute("href"),
					imageUrl: element
						.querySelector("div.s-item__image img")
						?.getAttribute("src"),
					});
				});

				return listOfProducts
			});
		await Product.deleteMany({})
        await Product.insertMany(searchData)
			// const items = [...document.querySelectorAll("ul > li.s-item")].slice(0, 20);
			// for (const item of items) {
			// 	// item.scrollIntoView();
			// 	await delay(50);
			// }

			// 	items.map(async (item) => {
			// 		listOfProducts.push({
			// 			title: item
			// 				.querySelector(".s-item__title")
			// 				?.textContent?.trim(),
			// price: parseFloat(
			// 	item
			// 		.querySelector("span.s-item__price")
			// 		?.textContent?.trim()
			// 		.replace("$", "") || ""
			// ),
			// 			// condition: item
			// 			// 	.querySelector("span.SECONDARY_INFO")
			// 			// 	?.textContent?.trim(),
			// 			// freeShipping:
			// 			// 	item
			// 			// 		.querySelector("span.s-item__shipping")
			// 			// 		?.textContent?.trim() === "Free shipping",
			// 			// freeReturns:
			// 			// 	item
			// 			// 		.querySelector("span.s-item__free-returns")
			// 			// 		?.textContent?.trim() === "Free returns",
			// 			// discount:
			// 			// 	item
			// 			// 		.querySelector("span.NEGATIVE")
			// 			// 		?.textContent?.trim() || false,
			// 			url: item
			// 				.querySelector("a.s-item__link")
			// 				?.getAttribute("href"),
			// 			imageUrl: item
			// 				.querySelector("div.s-item__image img")
			// 				?.getAttribute("src"),
			// 		});
			// });

		// 	return listOfProducts;
		// });
		// await Product.deleteMany({})
        // await Product.insertMany(searchData)
		
	// 	// // const data = JSON.stringify(searchData, null, 2);
	// 	// // fs.writeFileSync("originalProduct.json", data);
		
	// 	// await page.close();
	// 	// return searchData;
		
	} catch (error: any) {
		throw new Error(`Failed to scrape product: ${error.message}`);
	} 
}

export async function scrapeAndUpdateOneProduct(product: any) {
	if (!product) return;

	try {
		const browser = await getBrowserInstance();
		const page = await browser.newPage();
		await page.goto(product.url);

		let updatedProduct = await page.evaluate(async () => {
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

			let scrapedImageUrls: any[] = [];
			images.map((image) => {
				scrapedImageUrls.push(
					image.querySelector("img")?.getAttribute("data-src") ||
						"didnt work"
				);
			});

			return { seller, sellerPfp, sold, rating, scrapedImageUrls };
		});

		return updatedProduct;
	} catch (error: any) {
		console.log(`Failed to scrape product: ${error.message}`);
	} finally {
		console.log("done updating product");
	}
}

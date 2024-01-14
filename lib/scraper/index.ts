"use server";

const fs = require("fs");
import axios from "axios";
import * as cheerio from "cheerio";
const puppeteer = require("puppeteer");
import { Browser, Product } from "puppeteer";

// BrightData proxy configuration
const username = String(process.env.BRIGHT_DATA_USERNAME);
const password = String(process.env.BRIGHT_DATA_PASSWORD);
const auth = `${username}:${password}`;
const port = 22225;
const session_id = (1000000 * Math.random()) | 0;
const options = {
	auth: {
		username: `${username}-session-${session_id}`,
		password,
	},
	host: "brd.superproxy.io:22225",
	port,
	rejectUnauthorized: false,
};

export async function scrapeProducts(searchQuery: string) {
	if (!searchQuery) return;

	// const browser: Browser = await puppeteer.connect({
	//     browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`
	// })
	const browser: Browser = await puppeteer.launch({ headless: false });
	try {
		const page = await browser.newPage();
		await page.goto("https://www.ebay.com/");
		await page.waitForSelector("#gh-ac");
		await page.type("#gh-ac", searchQuery);
		await page.click('input[value="Search"]');
		await page.waitForNavigation();

		// const page = await browser.newPage();
		// page.setDefaultNavigationTimeout(2 * 60 * 1000);
		// await page.goto(url)

		var searchData = await page.evaluate(async () => {
			var listOfProducts: any[] = [];
			function delay(ms: number) {
				return new Promise((resolve) => {
					setTimeout(resolve, ms);
				});
			}

			const items = [...document.querySelectorAll("ul > li.s-item")];
			for (const item of items) {
				item.scrollIntoView();
				await delay(100);
			}

			items.map(async (item) => {
				// await page.goto('')
				// product =
				listOfProducts.push({
					title: item
						.querySelector(".s-item__title")
						?.textContent?.trim(),
					price: parseFloat(
						item
							.querySelector("span.s-item__price")
							?.textContent?.trim()
							.replace("$", "") || ""
					),
					seller: "",
					sellerPfp: "",
					sold: 0,
					rating: "",
					condition: item
						.querySelector("span.SECONDARY_INFO")
						?.textContent?.trim(),
					freeShipping:
						item
							.querySelector("span.s-item__shipping")
							?.textContent?.trim() === "Free shipping",
					freeReturns:
						item
							.querySelector("span.s-item__free-returns")
							?.textContent?.trim() === "Free returns",
					discount:
						item
							.querySelector("span.NEGATIVE")
							?.textContent?.trim() || false,
					url: item
						.querySelector("a.s-item__link")
						?.getAttribute("href"),
					imageUrl: item
						.querySelector("div.s-item__image img")
						?.getAttribute("src"),
					imageUrls: [],
				});
			});

			return listOfProducts;
		});

		const data = JSON.stringify(searchData, null, 2);
		fs.writeFileSync("originalProduct.json", data);

		return searchData;
	} catch (error: any) {
		throw new Error(`Failed to scrape product: ${error.message}`);
	} finally {
		console.log("done");
		browser.close();
	}
}

export async function scrapeAndUpdateOneProduct(product: any) {
	if (!product) return;

	const browser: Browser = await puppeteer.launch({ headless: false });
	try {
		const page = await browser.newPage();
		await page.goto(product.url);
		// await page.waitForNavigation();

		let updatedProduct = await page.evaluate(async () => {
			function delay(ms: number) {
				return new Promise((resolve) => {
					setTimeout(resolve, ms);
				});
			}
			// Search Seller's data
			const seller = document.querySelector('.d-stores-info-categories__container__info__section__title')?.textContent?.trim()
			const sellerPfp = document.querySelector(".d-stores-info-categories__container__info__image--img")?.getAttribute("src") || "didn't work";
			const sellerInfo = [...document.querySelectorAll(".d-stores-info-categories__container__info__section__item")];
			const rating = sellerInfo[0]?.textContent?.trim() || "didnt work";
			const sold = sellerInfo[1]?.textContent?.trim() || "didnt work";

			const images = [
				...document.querySelectorAll(
					".ux-image-grid-container.masonry-211.x-photos-max-view--show > div.ux-image-grid > button"
				),
			];
			for (const image of images) {
				image.scrollIntoView();
				await delay(100);
			}

			let scrapedImageUrls: any[] = [];
			images.map((image) => {
				scrapedImageUrls.push(image.querySelector('img')?.getAttribute("data-src") || "didnt work",);
			});

			return {seller, sellerPfp, sold, rating, scrapedImageUrls}
		});

		const data = JSON.stringify(updatedProduct, null, 2);
		fs.writeFileSync("updatedProducts.json", data);

		return updatedProduct;
	} catch (error: any) {
		console.log(`Failed to scrape product: ${error.message} dogggy`);
	} finally {
		console.log("done updating product");
		browser.close();
	}
}

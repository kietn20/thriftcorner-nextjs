"use server";

const fs = require("fs");
const puppeteer = require("puppeteer-core");
import { Browser } from "puppeteer";

// interface Chrome {
// 	args: any[]; // Change 'any' to the actual type of 'args' if possible,
// 	defaultViewport: any,
// 	executablePath: any,
// }

// BrightData proxy configuration
const username = String(process.env.BRIGHT_DATA_USERNAME);
const password = String(process.env.BRIGHT_DATA_PASSWORD);
const auth = `${username}:${password}`;
const port = 22225;
const session_id = (1000000 * Math.random()) | 0;
// const options = {
// 	auth: {
// 		username: `${username}-session-${session_id}`,
// 		password,
// 	},
// 	host: "brd.superproxy.io:22225",
// 	port,
// 	rejectUnauthorized: false,
// };

// let chrome = {}
// let puppeteer: any;

// import chromium from 'chrome-aws-lambda'
// import AWS from 'aws-sdk'

// const S3 = new AWS.S3({
// 	credentials: {
// 		accessKeyId: process.env.S3ACCESS_KEY || '',
// 		secretAccessKey: process.env.S3SECRET_KEY || ''
// 	}
// })

// import chromium from 'chrome-aws-lambda'
import chromium from '@sparticuz/chromium-min';
async function getBrowserInstance() {
	// const chromium = require('chrome-aws-lambda')
	const executablePath = await chromium.executablePath
	console.log(`-----Executable: ${executablePath}`)
	if (!executablePath){
		// run locally
		const puppeteer = require('puppeteer')
		return puppeteer.launch({
			args: chromium.args,
			headless: 'new',
			ignoreHTTPSErrors: true,
			ignoreDefaultArgs: ['--disable-extensions']
		})
	}

	// return chromium.puppeteer.launch({
	return puppeteer.launch({
		args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
		defaultViewport: chromium.defaultViewport,
		executablePath: await chromium.executablePath,
		headless: true,
		ignoreHTTPSErrors: true,
		ignoreDefaultArgs: ['--disable-extensions']
	})
}

export async function scrapeProducts(searchQuery: string) {
	if (!searchQuery) return;

	// const browser: Browser = await puppeteer.connect({
	//     browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`
	// })

	const browser: Browser = await getBrowserInstance()
	// const browser: Browser = await puppeteer.launch({ headless: 'new' });
	try {
		const page = await browser.newPage();

		// TEST
		// await page.goto('https://www.google.com')	
		// console.log(await page.title())	
		// return [{url: 'https://www.google.com', title: 'dog1'}, {url: 'https://www.google2.com', title: 'dog2'}]
		// TEST

		await page.goto("https://www.ebay.com/");
		await page.waitForSelector("#gh-ac");
		await page.type("#gh-ac", searchQuery);
		await page.click('input[value="Search"]');
		await page.waitForNavigation();

		var searchData = await page.evaluate(async () => {
			var listOfProducts: any[] = [];
			function delay(ms: number) {
				return new Promise((resolve) => {
					setTimeout(resolve, ms);
				});
			}

			const items = [...document.querySelectorAll("ul > li.s-item")].slice(0, 59);
			for (const item of items) {
				item.scrollIntoView();
				await delay(50);
			}

			items.map(async (item) => {
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

		// // const data = JSON.stringify(searchData, null, 2);
		// // fs.writeFileSync("originalProduct.json", data);

		return searchData;
	} catch (error: any) {
		throw new Error(`Failed to scrape product: ${error.message}`);
	} finally {
		console.log("done");
		await browser.close();
	}
}

export async function scrapeAndUpdateOneProduct(product: any) {
	if (!product) return;

	const browser: Browser = await puppeteer.launch({ headless: 'new' });
	// const browser: Browser = await getBrowserInstance();
	try {
		const page = await browser.newPage();
		await page.goto(product.url);

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
				await delay(50);
			}

			let scrapedImageUrls: any[] = [];
			images.map((image) => {
				scrapedImageUrls.push(image.querySelector('img')?.getAttribute("data-src") || "didnt work",);
			});

			return {seller, sellerPfp, sold, rating, scrapedImageUrls}
		});

		// const data = JSON.stringify(updatedProduct, null, 2);
		// fs.writeFileSync("updatedProducts.json", data);

		return updatedProduct;
	} catch (error: any) {
		console.log(`Failed to scrape product: ${error.message} dogggy`);
	} finally {
		console.log("done updating product");
		await browser.close();
	}
}

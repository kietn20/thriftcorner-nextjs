// "use server";
// BrightData proxy configuration
// const username = String(process.env.BRIGHT_DATA_USERNAME);
// const password = String(process.env.BRIGHT_DATA_PASSWORD);
// const auth = `${username}:${password}`;
// const port = 22225;
// const session_id = (1000000 * Math.random()) | 0;
// const options = {
// 	auth: {
// 		username: `${username}-session-${session_id}`,
// 		password,
// 	},
// 	host: "brd.superproxy.io:22225",
// 	port,
// 	rejectUnauthorized: false,
// };

// const puppeteer = require("puppeteer-core");
// import chromium from '@sparticuz/chromium-min';

const chromium = require("@sparticuz/chromium");
// chromium.setHeadlessMode = true;
// chromium.setGraphicsMode = false; 

async function getBrowserInstance() {
	if (process.env.NODE_ENV === 'development'){
		// run locally
		console.log('RUNNING LOCALLY !!!')
		const puppeteer = require('puppeteer')
		return puppeteer.launch({
			args: chromium.args,
			headless: 'new',
			ignoreHTTPSErrors: true,
			ignoreDefaultArgs: ['--disable-extensions']
		})
	}
	// await chromium.font("https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf");
	const puppeteer = require("puppeteer-core");
	console.log('RUNNING ON PRODUCTION !!!')
	return await puppeteer.launch({
		args: chromium.args,
		executablePath: await chromium.executablePath(),
		headless: chromium.headless,
	});
}
export async function scrapeProducts(searchQuery: string) {
	if (!searchQuery) return;

	// const browser: Browser = await puppeteer.connect({
	//     browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`
	// })

	const browser = await getBrowserInstance()
	// try {
	// 	const page = await browser.newPage();
	// 	await page.goto("https://www.ebay.com/");
	// 	await page.waitForSelector("#gh-ac");
	// 	await page.type("#gh-ac", searchQuery);
	// 	await page.click('input[value="Search"]');
	// 	await page.waitForNavigation();

	// 	var searchData = await page.evaluate(async () => {
	// 		var listOfProducts: any[] = [];
	// 		function delay(ms: number) {
	// 			return new Promise((resolve) => {
	// 				setTimeout(resolve, ms);
	// 			});
	// 		}

	// 		const items = [...document.querySelectorAll("ul > li.s-item")].slice(0, 20);
	// 		// for (const item of items) {
	// 		// 	// item.scrollIntoView();
	// 		// 	await delay(50);
	// 		// }

	// 		items.map(async (item) => {
	// 			listOfProducts.push({
	// 				title: item
	// 					.querySelector(".s-item__title")
	// 					?.textContent?.trim(),
	// 				price: parseFloat(
	// 					item
	// 						.querySelector("span.s-item__price")
	// 						?.textContent?.trim()
	// 						.replace("$", "") || ""
	// 				),
	// 				// condition: item
	// 				// 	.querySelector("span.SECONDARY_INFO")
	// 				// 	?.textContent?.trim(),
	// 				// freeShipping:
	// 				// 	item
	// 				// 		.querySelector("span.s-item__shipping")
	// 				// 		?.textContent?.trim() === "Free shipping",
	// 				// freeReturns:
	// 				// 	item
	// 				// 		.querySelector("span.s-item__free-returns")
	// 				// 		?.textContent?.trim() === "Free returns",
	// 				// discount:
	// 				// 	item
	// 				// 		.querySelector("span.NEGATIVE")
	// 				// 		?.textContent?.trim() || false,
	// 				url: item
	// 					.querySelector("a.s-item__link")
	// 					?.getAttribute("href"),
	// 				imageUrl: item
	// 					.querySelector("div.s-item__image img")
	// 					?.getAttribute("src"),
	// 			});
	// 		});

	// 		return listOfProducts;
	// 	});
	// 	// // const data = JSON.stringify(searchData, null, 2);
	// 	// // fs.writeFileSync("originalProduct.json", data);
		
	// 	// await page.close();
	// 	return searchData;
	try {
		const page = await browser.newPage();
		await page.goto("https://www.example.com", { waitUntil: "networkidle0" });
		console.log("Chromium:", await browser.version());
		console.log("Page Title:", await page.title());
		
		return [{url: 'www.google1.com', title: 'dog1', price: 1.89}, {url: 'www.google2.com', title: 'dog2', price: 1.89}, {url: 'www.google3.com', title: 'dog3', price: 1.89}, {url: 'www.google4.com', title: 'dog4', price: 1.89}, {url: 'www.google5.com', title: 'dog5', price: 1.89}, {url: 'www.google6.com', title: 'dog6', price: 1.89}, {url: 'www.google7.com', title: 'dog7', price: 1.89}, {url: 'www.google8.com', title: 'dog8', price: 1.89}, {url: 'www.google9.com', title: 'dog9', price: 1.89}, {url: 'www.google10.com', title: 'dog10', price: 1.89}, {url: 'www.google11.com', title: 'dog11', price: 1.89}, {url: 'www.google12.com', title: 'dog12', price: 1.89}]
	} catch (error: any) {
		throw new Error(`Failed to scrape product: ${error.message}`);
	} finally {
		console.log("done");
		await browser.close();
	}
}

export async function scrapeAndUpdateOneProduct(product: any) {
	if (!product) return;

	// const browser = await puppeteer.launch({ headless: 'new' });
	const browser = await getBrowserInstance();
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
			// for (const image of images) {
			// 	// image.scrollIntoView();
			// 	await delay(50);
			// }

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

// export const config = {
// 	runtime: 'edge',
// }

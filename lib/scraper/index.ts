'use server'
const fs = require('fs');
import axios from 'axios';
import * as cheerio from 'cheerio';
const puppeteer = require('puppeteer')
import { Browser } from "puppeteer";

export async function scrapeProduct(url: string) {
    if (!url) return;

    // BrightData proxy configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const auth = `${username}:${password}`
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;
    const options = {
        auth: {
            username:  `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io:22225',
        port,
        rejectUnauthorized: false,
    }

    // const browser: Browser = await puppeteer.connect({
    //     browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`
    // })
    const browser: Browser = await puppeteer.launch({ headless: true})
    try {
        const page = await browser.newPage()
        await page.goto('https://www.ebay.com/')
        await page.waitForSelector('#gh-ac')
        await page.type('#gh-ac', url)
        await page.click('input[value="Search"]')
        await page.waitForNavigation()

        // const page = await browser.newPage();
        // page.setDefaultNavigationTimeout(2 * 60 * 1000);
        // await page.goto(url)
        
        const productData = await page.evaluate(async () => {
            function delay(ms: number) {
                return new Promise((resolve) => { setTimeout(resolve, ms) })
            }

            const items = [...document.querySelectorAll('ul > li.s-item')]
            for (const item of items) {
                item.scrollIntoView()
                await delay(100)
            }

            return items.map(item => ({
                title: item.querySelector('.s-item__title')?.textContent?.trim(),
                price: parseFloat(item.querySelector('span.s-item__price')?.textContent?.trim().replace('$', '') || ""),
                condition: item.querySelector('span.SECONDARY_INFO')?.textContent?.trim(),                
                freeShipping: item.querySelector('span.s-item__shipping')?.textContent?.trim() === 'Free shipping',
                freeReturns: item.querySelector('span.s-item__free-returns')?.textContent?.trim() === 'Free returns',
                discount: item.querySelector('span.NEGATIVE')?.textContent?.trim() || false,
                link: item.querySelector('a.s-item__link')?.getAttribute('href'),
                imageUrl: item.querySelector('div.s-item__image img')?.getAttribute('src')
            }))
        });

        // console.log(productData)
        const data = JSON.stringify(productData, null, 2);
        fs.writeFileSync('items2.json', data);
        
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    } finally {
        await browser.close()
    }
}
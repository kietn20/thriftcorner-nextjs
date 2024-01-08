'use server'
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeProduct(url: string) {
    if (!url) return;

    // BrightData proxy configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
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

    try {
        const response = await axios.get(url, options)
        const $ = cheerio.load(response.data);

        const title = $('.x-item-title__mainTitle').text().trim();
        const price = $('.x-price-primary').text().trim()
        // const condition = $('.x-item-condition-text span.ux-textspans').text().trim()
        const seller = $('.d-stores-info-categories__container__info__section__title').text().trim()
        // const listOfImages = $('.ux-image-carousel zoom img-transition-medium');
        // const imageUrls: String[] = [];

        // $('div.ux-image-carousel zoom img-transition-medium').each((index, element) => {
        // const imageUrl = $(element).find('img').attr('srcset');
        // if (imageUrl) {
        //     imageUrls.push(imageUrl);
        // }
        // });

        const imageUrls: String[] = [];

        // Selecting image URLs within the '.ux-image-grid' class
        $('.ux-image-grid-item > img').each((index, element) => {
        const imageUrl = $(element).attr('src');
        if (imageUrl) {
            imageUrls.push(imageUrl);
        }
        });

        console.log('Image URLs:', imageUrls);
        console.log({title, price, seller});
        console.log($('.x-photos-min-view filmstrip filmstrip-x'))
        // console.log('Image URLs:', imageUrls);

    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}
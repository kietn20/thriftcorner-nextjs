// "use client";
import CarouselComponent from "@/components/CarouselComponent";
import { getProductById } from "@/lib/actions";
import { scrapeAndUpdateOneProduct } from "@/lib/scraper";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React from "react";

type Props = {
	params: { id: string };
};

const info = {
	seller: "choesengoods",
	sellerPfp: "https://i.ebayimg.com/images/g/x7cAAOSwTwNi6Vd4/s-l140.jpg",
	sold: "5.8K items sold",
	rating: "100% Positive Feedback",
	scrapedImageUrls: [
		"https://i.ebayimg.com/images/g/tJwAAOSwtERk5-lL/s-l500.jpg",
		"https://i.ebayimg.com/images/g/CzQAAOSwukZk5-lM/s-l500.jpg",
		"https://i.ebayimg.com/images/g/na0AAOSwQQhk5-lL/s-l500.jpg",
		"https://i.ebayimg.com/images/g/KKkAAOSwFddk5-lM/s-l500.jpg",
		"https://i.ebayimg.com/images/g/NBYAAOSwBd5k5-lL/s-l500.jpg",
		"https://i.ebayimg.com/images/g/krsAAOSwtg1k5-lK/s-l500.jpg",
		"https://i.ebayimg.com/images/g/WckAAOSwSANk5-lK/s-l500.jpg",
		"https://i.ebayimg.com/images/g/FO4AAOSwMWFk5-lL/s-l500.jpg",
		"https://i.ebayimg.com/images/g/M08AAOSwANNk5-lL/s-l500.jpg",
		"https://i.ebayimg.com/images/g/JGsAAOSwdM5k5-lK/s-l500.jpg",
		"https://i.ebayimg.com/images/g/AzAAAOSwcn1k5-lK/s-l500.jpg",
		"https://i.ebayimg.com/images/g/~0cAAOSwFm1k5-lM/s-l500.jpg",
	],
};

const ProductDetails = async ({ params: { id } }: Props) => {
	let product = await getProductById(id);
	if (!product) redirect("/");

	// const info = await scrapeAndUpdateOneProduct(product);
	// console.log(`object: ${info}`);
	return (
		<div className="m-auto mt-24 w-[1500px] flex justify-between border border-pink-500 gap-52 p-10">
			<div className="relative">
				<CarouselComponent url={product.url} srcs={info.scrapedImageUrls}/>
				{/* <span className="opacity-100 absolute bottom-8 left-8 hover:opacity-100 text-black">
					Ebay
				</span> */}
			</div>
			<div className="flex flex-col">
				<h1>{product.title}</h1>
				<div className="flex flex-col">
					<h2>US ${product.price}</h2>
					{product.freeShipping ? (
						<span>Free Shipping</span>
					) : (
						"No Free Shipping"
					)}
					{product.freeReturns ? (
						<span>Free Returns</span>
					) : (
						"No Free Returns"
					)}
					<h4>Seller</h4>
					<div>
						<Image
							src={info?.sellerPfp || ""}
							width={100}
							height={100}
							alt={`${info?.seller} Avatar`}
						/>
						<div className="flex flex-col">
							<span>{info?.seller}</span>
							<span>{info?.sold}</span>
							<span>{info?.rating}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;

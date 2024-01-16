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

import { DM_Serif_Text } from "next/font/google";
const DMST = DM_Serif_Text({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-DMST",
});

const ProductDetails = async ({ params: { id } }: Props) => {
	let product = await getProductById(id);
	if (!product) redirect("/");

	const info = await scrapeAndUpdateOneProduct(product);
	// console.log(`object: ${info}`);
	return (
		<div className="m-auto mt-24 w-[1500px] flex justify-center gap-20 p-10">
			<div className="">
				<CarouselComponent
					url={product.url}
					srcs={info?.scrapedImageUrls}
					parent="productpage"
				/>
			</div>
			<div className="flex flex-col w-[600px] p-8">
				<h1
					className={`text-3xl ${DMST.variable} font-sans text-center`}
				>
					{product.title}
				</h1>
				<div className="flex flex-col">
					<br />
					<br />
					<div className="flex justify-between">
						<div className="flex flex-col">
							{product.discount !== "false" ? (
								<h2
									className={`text-2xl ${DMST.variable} font-sans text-red-600`}
								>
									{product.discount}
								</h2>
							) : (
								""
							)}
							<h2
								className={`text-3xl ${DMST.variable} font-sans`}
							>
								US ${product.price.toFixed(2)}
							</h2>
							<h2
								className={`text-2xl ${DMST.variable} font-sans mt-56`}
							>
								Seller:
							</h2>
							<div className="flex justify-start gap-8 w-[300px] mt-5">
								<Image
									src={info?.sellerPfp || ""}
									width={50}
									height={50}
									alt={`${info?.seller} Avatar`}
									className="rounded-xl"
								/>
								<div className="flex flex-col">
									<span
										className={`text-1xl ${DMST.variable} font-sans`}
									>
										{info?.seller}
									</span>
									<span
										className={`text-1xl ${DMST.variable} font-sans`}
									>
										{info?.sold}
									</span>
									<span
										className={`text-1xl ${DMST.variable} font-sans`}
									>
										{info?.rating}
									</span>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							{product.condition === "Pre-Owned" ? (
								<>
									<Image
										src={"/assets/preowned.png"}
										width={130}
										height={35}
										alt="freeShipping"
									/>
								</>
							) : (
								<Image
									src={"/assets/buynew.png"}
									width={130}
									height={35}
									alt="freeShipping"
								/>
							)}
							{product.freeShipping ? (
								<>
									<Image
										src={"/assets/freeshipping.png"}
										width={130}
										height={35}
										alt="freeShipping"
									/>
								</>
							) : (
								""
							)}
							{product.freeReturns ? (
								<Image
									src={"/assets/freereturns.png"}
									width={130}
									height={35}
									alt="freeShipping"
								/>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;

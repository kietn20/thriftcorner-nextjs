// "use client";
import { getProductById } from "@/lib/actions";
import { scrapeAndUpdateOneProduct } from "@/lib/scraper";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, FormEvent, useState } from "react";

type Props = {
	params: { id: string };
};

const ProductDetails = async ({ params: { id } }: Props) => {
	let product = await getProductById(id);
	if (!product) redirect("/");

	const info = await scrapeAndUpdateOneProduct(product);
	console.log(`object: ${info}`);
	return (
		<>
			<div>{product.title}</div>
			<div>{info?.seller}</div>
			<div>{info?.sold}</div>
			<div>{info?.rating}</div>
			<Image
				src={info?.scrapedImageUrls[0]}
				width={100}
				height={100}
				alt="image1"
			/>
			<Image
				src={info?.scrapedImageUrls[1]}
				width={100}
				height={100}
				alt="image2"
			/>
			<Image
				src={info?.scrapedImageUrls[1]}
				width={100}
				height={100}
				alt="image3"
			/>
		</>
	);
};

export default ProductDetails;

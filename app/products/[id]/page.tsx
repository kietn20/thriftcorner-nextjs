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

	product = await scrapeAndUpdateOneProduct(product);
	console.log(`object: ${product}`)
	return (
		<>
			<div>{product.title}</div>
			<div>{product.seller}</div>
			<div>{product.sold}</div>
			<div>{product.rating}</div>
			{/* <Image
				src={product.imageUrls[0]}
				width={100}
				height={100}
				alt="image1"
			/>
			<Image
				src={product.imageUrls[1]}
				width={100}
				height={100}
				alt="image1"
			/>
			<Image
				src={product.imageUrls[1]}
				width={100}
				height={100}
				alt="image1"
			/> */}
		</>
	);
};

export default ProductDetails;

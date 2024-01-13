"use client";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/actions";
import { DM_Serif_Text } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const DMST = DM_Serif_Text({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-DMST",
});

const Shop = ({ allProducts }: any) => {
	// const [allProducts, setAllProducts] = useState(await getAllProducts());

	return (
		<>
			<span
				id="shopArea"
				className={`text-4xl ${DMST.variable} font-sans pt-10`}
			>
				shop.
			</span>
			<br />
			<br />
			<div className="flex flex-wrap justify-around gap-0">
				{allProducts?.map((product: any) => (
					<Link
						href={`/products/${product._id}`}
						target="_blank"
						key={product.title}
						className="group relative w-1/3 p-12 flex flex-col items-center justify-center bg-black border border-white hover:bg-[#7e9c6c] hover:ease-out duration-300"
					>
						<div className="p-2 group">
							<span className="text-white group opacity-0 absolute top-3 left-3 text-start group-hover:opacity-100 duration-300">
								{product.title}
							</span>
							<Image
								src={product.imageUrl}
								width={300}
								height={200}
								alt={product.title}
								className="flex align-middle"
							/>
							<span className="text-white group opacity-0 absolute bottom-1 left-3 text-start group-hover:opacity-100 duration-300">
								{product.price?.toFixed(2)}
							</span>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};

export default Shop;

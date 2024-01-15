"use client";
import { DM_Serif_Text } from "next/font/google";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import CarouselComponent from "@/components/CarouselComponent";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Shop from "@/components/Shop";

const DMST = DM_Serif_Text({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-DMST",
});

const clothesSrc = [
	"/assets/test1.jpg",
	"/assets/test2.jpg",
	"/assets/test3.jpg",
	"/assets/test4.jpg",
	"/assets/test5.jpg",
];

export default function Home() {
	// const initialProducts =  await getAllProducts();
	const [allProducts, setAllProducts] = useState([]);

	const updateSearchBar = async () => {
		setAllProducts(await getAllProducts());
		setTimeout(() => {
			const shopArea = document.getElementById("shopArea");
			shopArea?.scrollIntoView({ behavior: "smooth", inline: "center" });
		}, 800);
	};

	return (
		<>
			<section className="mt-36 px-6 md:px-20">
				<div className="flex max-xl:flex-col gap-24 justify-center items-center">
					<div className="flex flex-col justify-center w-[600px]">
						<h1 className={`text-5xl ${DMST.variable} font-sans`}>
							Stay <span className="text-[#7e9c6c]">thrifty</span>{" "}
							at the corner of the web
						</h1>
						<br />
						<p className="w-[500px]">
							Powerful, self-serve product and growth analytics to
							help you convert, engage, and retain more.
						</p>
						<br />
						<SearchBar updateSearchBar={updateSearchBar} />
					</div>
					<CarouselComponent srcs={clothesSrc}/>
				</div>
				<div className="mt-28 text-center px-0">
					{allProducts.length > 0 ? (
						<Shop id="shopArea" allProducts={allProducts} />
					) : (
						""
					)}
				</div>
			</section>
		</>
	);
}

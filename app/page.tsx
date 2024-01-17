"use client";
import { DM_Serif_Text } from "next/font/google";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";
import Shop from "@/components/Shop";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Contact from "@/components/Contact";

const DMST = DM_Serif_Text({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-DMST",
});

const displayItems = [
	{
		url: "https://www.ebay.com/itm/386483529913?hash=item59fc36a8b9:g:jNMAAOSwJh5lhp1S",
		imageSrc: "/assets/test5.jpg",
	},
	{
		url: "https://www.ebay.com/itm/386577108314?hash=item5a01ca8d5a:g:0tUAAOSwIydlmOOH",
		imageSrc: "/assets/test2.jpg",
	},
	{
		url: "https://www.ebay.com/itm/386638465871?hash=item5a0572cb4f:g:IagAAOSwxOJlpLhe",
		imageSrc: "/assets/test3.jpg",
	},
	{
		url: "https://www.ebay.com/itm/386638477059?hash=item5a0572f703:g:g1cAAOSwxNxlpLj6",
		imageSrc: "/assets/test4.jpg",
	},
	{
		url: "https://www.ebay.com/itm/386577098688?hash=item5a01ca67c0:g:GDwAAOSwGr5lmONe",
		imageSrc: "/assets/test1.jpg",
	},
];

export default function Home() {
	const [allProducts, setAllProducts] = useState([]);

	const updateSearchBar = async () => {
		setAllProducts([]);
		setAllProducts(await getAllProducts());
		setTimeout(() => {
			const shopArea = document.getElementById("shopArea");
			shopArea?.scrollIntoView({ behavior: "smooth", inline: "center" });
		}, 700);
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
					<Carousel className="w-full max-w-[600px] p-5">
						<CarouselContent>
							{displayItems.map((item) => (
								<CarouselItem key={item.url} className="">
									<div className="group rounded-xl flex justify-center hover:p-8 ease-in-out duration-300 bg-[#7e9c6c]">
										<Link href={item.url} target="_blank">
											<Card className="">
												<CardContent className="flex justify-center aspect-square p-2">
													<Image
														src={item.imageSrc}
														width={600}
														height={400}
														alt="1"
														className="rounded-md"
													/>
												</CardContent>
											</Card>
										</Link>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
				<div className="mt-28 text-center">
					{allProducts.length > 0 ? (
						<Shop id="shopArea" allProducts={allProducts} />
					) : (
						""
					)}
				</div>
				<Contact />
			</section>
		</>
	);
}

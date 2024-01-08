"use client";

import { scrapeProduct } from "@/lib/scraper";
import Image from "next/image";
import { DM_Serif_Text } from "next/font/google";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import SearchBar from "@/components/SearchBar";

const clothesSrc = [
	"/assets/test1.jpg",
	"/assets/test2.jpg",
	"/assets/test3.jpg",
	"/assets/test4.jpg",
	"/assets/test5.jpg",
];

const DMST = DM_Serif_Text({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-DMST",
});

export default function Home() {
	// console.log(
	// 	await scrapeProduct(
	// 		"https://www.ebay.com/itm/386470085996?hash=item59fb69856c:g:6nEAAOSw~7dlg8gU"
	// 	)
	// );

	// scrapeProduct('https://www.ebay.com/itm/386470085996?hash=item59fb69856c:g:6nEAAOSw~7dlg8gU');

	return (
		<>
			<section className="mt-32 px-6 py- md:px-20">
				<div className="flex max-xl:flex-col gap-24 justify-center">
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
						<SearchBar />
					</div>
					<Carousel className="w-full max-w-[600px]">
						<CarouselContent>
							{clothesSrc.map((object, index) => (
								<CarouselItem key={index}>
									<div key={index} className="">
										<Card className="rounded-md border border-dashed border-[#7e9c6c]">
											<CardContent className="flex aspect-square items-center justify-center p-2">
												<Image
													src={object}
													width={600}
													height={500}
													alt="1"
													className="rounded-md"
												/>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</section>
		</>
	);
}

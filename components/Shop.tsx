"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";

import { DM_Serif_Text } from "next/font/google";
import Statistics from "./Statistics";
const DMST = DM_Serif_Text({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-DMST",
});

const Shop = ({ allProducts }: any) => {
	let min = Math.min(...allProducts.map((product: any) => product.price));
	let max = Math.max(...allProducts.map((product: any) => product.price));
	let mean = (
		allProducts.reduce(
			(sum: Number, current: any) => sum + current.price,
			0
		) / allProducts.length
	).toFixed(2);
	let median = [
		...allProducts.map((product: any): any => product.price),
	].sort()[Math.trunc(allProducts.length / 2)];
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
						// bg-[#D9D9D9]
						className="group relative w-1/3 p-12 flex flex-col items-center justify-center bg-black border border-white hover:bg-[#7e9c6c] hover:ease-out duration-300"
					>
						<div className="p-2 group">
							<span className="text-white group opacity-0 absolute top-3 left-3 text-start group-hover:opacity-100 duration-300">
								{product.title}
							</span>
							<Image
								src={product.imageUrl}
								width={300}
								height={150}
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
			<div className="sticky bottom-0 float-right p-3">
				<Dialog>
					<DialogTrigger asChild>
						<Button className="rounded-full bg-[#7e9c6c]">
							Analytics
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[1000px]">
						<DialogHeader className="">
							<div>
								<DialogTitle>
									Analystics of Searched Products
								</DialogTitle>
								<DialogDescription>
									Curious of the prices of your searched
									product?
								</DialogDescription>
							</div>
							<div className="flex justify-center gap-24">
								<div className="flex flex-col">
									<span>
										<span className="font-semibold">Low: &nbsp;</span>
										{min}
									</span>
									<span>
										<span className="font-semibold">High: </span>
										{max}
									</span>
								</div>
								<div className="flex flex-col">
									<span>
										<span className="font-semibold">Mean: &nbsp;&nbsp;&nbsp;</span>
										{mean}
									</span>
									<span>
										<span className="font-semibold">Median: </span>
										{median}
									</span>
								</div>
							</div>
						</DialogHeader>
						<Statistics products={allProducts} />
						<DialogFooter className="sm:justify-start">
							<DialogClose asChild>
								<Button
									type="button"
									className="bg-[#7E9C6C] text-white"
								>
									Close
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};

export default Shop;

import { DM_Serif_Text } from "next/font/google";
import * as React from "react";
import SearchBar from "@/components/SearchBar";
import CarouselComponent from "@/components/CarouselComponent";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";

const DMST = DM_Serif_Text({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-DMST",
});

export default async function Home() {
	const allProducts = await getAllProducts();
	return (
		<>
			<section className="mt-32 px-6 py- md:px-20">
				<div className="flex max-xl:flex-col gap-24 justify-center ">
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
					<CarouselComponent />
				</div>
				<br />
				<div className="mt-40 text-center">
					<span className={`text-4xl ${DMST.variable} font-sans`}>
						trending.
					</span>
					<br />
					<br />
					<div className="flex flex-wrap justify-around gap-2 border border-pink-800">
						{allProducts?.map((product) => (
							<div className="w-1/4 flex flex-col items-center justify-start relative border border-blue-500">
								{/* <span
									className={`text-1xl ${DMST.variable} font-sans`}
								>
									{product.title}
								</span> */}
								<div className="p-2">
									<Image
										src={product.imageUrl}
										width={600}
										height={700}
										alt={product.title}
										className="flex align-middle"
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}

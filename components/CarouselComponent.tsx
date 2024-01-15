"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
	srcs?: string[];
	url?: string;
}

const CarouselComponent: React.FC<ProductProps> = (props?: ProductProps) => {
	return (
		<div>
			<Carousel className="w-full max-w-[600px] p-5">
				<Link href={props?.url || ""} target="_blank" className="group">
					<CarouselContent>
						{props?.srcs?.map((image: string) => (
							<CarouselItem key={image} className="">
								<div
									key={image}
									className="rounded-xl flex justify-center hover:p-7 ease-in-out duration-300 bg-[#7e9c6c]"
								>
									<Card>
										<CardContent className="flex justify-center aspect-square p-2">
											<Image
												src={image}
												width={600}
												height={500}
												alt="1"
												className="rounded-md"
											/>
										</CardContent>
										<span className="text-xs font-light opacity-0 absolute bottom-3 left-8 text-white">
											Ebay
										</span>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Link>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
};

export default CarouselComponent;

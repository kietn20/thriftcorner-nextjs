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
import { FaExternalLinkAlt } from "react-icons/fa";

interface ProductProps {
	srcs?: string[];
	url?: string;
}

const CarouselComponent: React.FC<ProductProps> = (props?: ProductProps) => {
	return (
		<div>
			<Carousel className="w-full max-w-[600px] p-5">
				<Link href={props?.url || ""} target="_blank" className="">
					<CarouselContent>
						{props?.srcs?.map((image: string) => (
							<CarouselItem key={image} className="">
								<div
									key={image}
									className="group rounded-xl flex justify-center hover:p-8 ease-in-out duration-300 bg-[#7e9c6c]"
								>
									<Card className="">
										<CardContent className="flex justify-center aspect-square p-2">
											<Image
												src={image}
												width={600}
												height={500}
												alt="1"
												className="rounded-md"
											/>
										</CardContent>
									</Card>
									<span className="text-xs font-light opacity-0 group-hover:opacity-100 absolute bottom-2 left-7 text-white flex">
										Ebay&nbsp;&nbsp;
										<FaExternalLinkAlt />
									</span>
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

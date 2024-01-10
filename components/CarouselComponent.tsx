'use client'

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

const clothesSrc = [
	"/assets/test1.jpg",
	"/assets/test2.jpg",
	"/assets/test3.jpg",
	"/assets/test4.jpg",
	"/assets/test5.jpg",
];

const CarouselComponent = () => {
	return (
		<div>
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
	);
};

export default CarouselComponent;

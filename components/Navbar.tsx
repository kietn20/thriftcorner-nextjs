import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DM_Serif_Text } from "next/font/google";

const DMST = DM_Serif_Text({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-DMST",
});

const Navbar = () => {
	return (
		//fixed position for fixed navbar?? or sticky??
		<div className="flex flex-col w-96 mx-auto relative">
			<Link
				href="/"
				className={`text-center text-[40px] h-12 ${DMST.variable} font-sans`}
			>
				thriftcorner
			</Link>
			<div className="flex justify-center">
				<Image
					src="/assets/hangers.png"
					width={90}
					height={45}
					alt="hanger icon"
				/>
			</div>
		</div>
	);
};

export default Navbar;

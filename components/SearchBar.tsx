"use client";

import React, { FormEvent, useState } from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { scrapeAndStoreProduct } from "@/lib/actions";

const SearchBar = () => {
	const [searchPrompt, setSearchPrompt] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const isValidProductLink = (url: string) => {
		const parsedURL = new URL(url);
		const hostname = parsedURL.hostname;

		if (
			hostname.includes("ebay.com") ||
			hostname.includes("ebay.") ||
			hostname.includes("ebay")
		) {
			return true;
		}
		return false;
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const isValidLink = isValidProductLink(searchPrompt);
		if (!isValidLink) alert("Please enter a valid link.");

        // Scrape Product 
        const product = await scrapeAndStoreProduct(searchPrompt);

		try {
			setIsLoading(true);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form action="" onSubmit={handleSubmit} className="flex gap-5">
			<Select defaultValue="Ebay">
				<SelectTrigger className="w-[130px] bg-[#7e9c6c] text-white">
					<SelectValue className="text-center" placeholder="Ebay" />
				</SelectTrigger>
				<SelectContent className="bg-[#7e9c6c] text-white">
					<SelectGroup>
						<SelectLabel>Market</SelectLabel>
						<SelectItem value="Ebay">Ebay</SelectItem>
						<SelectItem value="Facebook">Facebook</SelectItem>
						<SelectItem value="OfferUp">OfferUp</SelectItem>
						<SelectItem value="Poshmark">Poshmark</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<Input
				type="text"
				value={searchPrompt}
				onChange={(e) => setSearchPrompt(e.target.value)}
				placeholder="Enter Product Link"
				className="w-[300px]"
			/>
			<Button
				type="submit"
				className="bg-black"
				variant="default"
				disabled={searchPrompt === ""}
			>
				Search
			</Button>
		</form>
	);
};

export default SearchBar;

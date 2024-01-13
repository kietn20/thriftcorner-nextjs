// "use client";
import { getProductById } from "@/lib/actions";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, FormEvent, useState } from "react";

type Props = {
	params: { id: string };
};

const ProductDetails = async ({ params: {id} } : Props) => {
	const product = await getProductById(id);

	if (!product) redirect('/')

	return (
		<>
			<div>{product.title}</div>
			<div></div>
		</>
	);
};

export default ProductDetails;

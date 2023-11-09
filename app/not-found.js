"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Lottie from "lottie-react";
import notFound from "@/constants/assets/images/lottie/404.json";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Translations from "@/components/Translations";

export const metadata = {
	title: "Error-404",
	description: "Error-404",
};

const NotFoundMain = () => {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<div className="bg-white h-full">
			<Container className={"bg-white h-full flex flex-col justify-center items-center"}>
				<Lottie animationData={notFound} loop={true} style={{ height: "40vh" }} />

				<Link href={"/"}>
					<Button size="lg">
						<Translations text="shared.home" />
					</Button>
				</Link>
			</Container>
		</div>
	);
};

export default NotFoundMain;

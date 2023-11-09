"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = ({ src, className }) => {
	const router = useRouter();
	return (
		<Image
			className={cn("hover:cursor-pointer md:mr-5", className)}
			src={src ? src : "/images/default/logo.png"}
			width={120}
			height={80}
			alt="paiecash logo"
			onClick={() => router.push("/")}
		/>
	);
};

export default Logo;

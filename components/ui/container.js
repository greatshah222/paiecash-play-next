"use client";

import { cn } from "@/lib/utils";

const Container = ({ children, className }) => {
	return (
		<div
			className={cn(
				"w-full sm:w-[94%] p-5 sm:p-10 pt-[90px] sm:pt-[90px] lg:max-w-[1600px] m-auto ",
				className
			)}
		>
			{children}
		</div>
	);
};

export default Container;

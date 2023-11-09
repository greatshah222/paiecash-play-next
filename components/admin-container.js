"use client";

import { cn } from "@/lib/utils";

const AdminContainer = ({ children, className }) => {
	return (
		<div className={cn("w-full px-3 py-6 bg-brand m-auto mt-[125px] md:mt-0", className)}>
			{children}
		</div>
	);
};

export default AdminContainer;

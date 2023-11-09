"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import useAdminSidebar from "@/hooks/useAdminSidebar";
import Sidebar from ".";

export const AdminMobileSidebar = () => {
	const [isMounted, setIsMounted] = useState(false);

	const isOpen = useAdminSidebar((state) => state.isOpen);
	const onOpen = useAdminSidebar((state) => state.onOpen);
	const onClose = useAdminSidebar((state) => state.onClose);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<Button
				variant="ghost"
				size="icon"
				className="md:hidden bg-brand m-3 inset-0 top-[70px] absolute z-30 flex justify-center items-center"
				onClick={() => (isOpen ? onClose() : onOpen())}
			>
				<span className="sr-only">Open sidebar</span>
				<svg
					className="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clip-rule="evenodd"
						fill-rule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
					></path>
				</svg>
			</Button>
			<SheetContent side="left" className="p-0  max-w-xs border-none bg-slate-900 mt-[100px] ">
				<Sidebar />
			</SheetContent>
		</Sheet>
	);
};

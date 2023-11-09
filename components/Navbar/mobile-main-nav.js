"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import MainNav from "./main-nav";
import useSidebar from "@/hooks/useSidebar";

const MobileMainNav = () => {
	const [isMounted, setIsMounted] = useState(false);

	const isOpen = useSidebar((state) => state.isOpen);
	const onOpen = useSidebar((state) => state.onOpen);
	const onClose = useSidebar((state) => state.onClose);

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
				className="inline-flex transition items-center bg-white p-2 mt-2 ml-3 text-sm text-brand rounded-lg md:hidden hover:bg-brand hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				onClick={() => (isOpen ? onClose() : onOpen())}
			>
				{isOpen ? <X /> : <Menu />}
			</Button>
			<SheetContent side="right" className="p-0  max-w-xs w-60 border-none bg-white mt-[80px] ">
				<MainNav className={"flex flex-col"} />
			</SheetContent>
		</Sheet>
	);
};

export default MobileMainNav;

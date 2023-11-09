"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Modal = ({ title, description, isOpen, onClose, children, className }) => {
	const onChange = (open) => {
		if (!open) {
			onClose();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onChange}>
			<DialogContent className={cn("bg-white", className)}>
				<DialogHeader>
					<DialogTitle className="text-black">{title}</DialogTitle>

					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				<div>{children}</div>
			</DialogContent>
		</Dialog>
	);
};

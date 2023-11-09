"use client";

import Translations from "@/components/Translations";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Header = ({ title, viewAll = true, viewAllLink, className }) => {
	return (
		<div className={cn("flex justify-between items-center ", className)}>
			<div className={`font-bold text-2xl text-black`}>{title}</div>
			{viewAll && viewAllLink && (
				<div className="text-sm">
					<Link href={viewAllLink} className={"text-brand hover:text-brandHover transition"}>
						<Translations text="shared.viewAll" />
					</Link>
				</div>
			)}
		</div>
	);
};

export default Header;

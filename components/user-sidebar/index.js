"use client";

import Link from "next/link";
import { Montserrat } from "next/font/google";
import { CreditCard, LayoutDashboard, Lock, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import Translations from "../Translations";
import { useMyContext } from "@/context/StateHolder";
import useUserSidebar from "@/hooks/useUserSidebar";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
	{
		label: <Translations text="userprofile.userDetail" />,

		icon: User,
		color: "text-pink-200",
		href: "/user/user-detail",
	},
	{
		label: <Translations text="userprofile.changePassword" />,

		icon: Lock,
		href: "/user/change-password",

		color: "text-red-400",
	},
	{
		label: <Translations text="userprofile.subscription" />,

		icon: CreditCard,
		color: "text-slate-300",

		href: "/user/subscriptions",
	},
];

const UserSidebar = () => {
	const [isMounted, setIsMounted] = useState(false);
	const pathname = usePathname();

	const { initialLanguageLoaded } = useMyContext();
	const isOpen = useUserSidebar((state) => state.isOpen);
	const onClose = useUserSidebar((state) => state.onClose);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted || !initialLanguageLoaded) return <div className="sidebar " />;

	return (
		<div className="px-3 py-2 flex-1 bg-slate-900">
			<Link href="/user/user-detail" className="flex items-center pl-3 mb-14">
				<h1 className={cn("text-2xl font-bold", poppins.className)}>
					<Translations text="userprofile.dashboard" />
				</h1>
			</Link>
			<div className="space-y-2">
				{routes.map((route) => (
					<Link
						key={route.href}
						href={route.href}
						className={cn(
							"text-sm group flex p-3 w-full justify-start cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
							pathname === route.href ? "text-white bg-white/10" : "text-gray-100"
						)}
						onClick={() => {
							isOpen && onClose();
						}}
					>
						<div className="flex items-center flex-1">
							<route.icon className={cn("h-5 w-5 mr-3", route.color)} />
							{route.label}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default UserSidebar;

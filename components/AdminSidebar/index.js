"use client";

import Link from "next/link";
import { Montserrat } from "next/font/google";
import {
	ArrowRight,
	History,
	PieChart,
	Plus,
	RadioTower,
	Settings,
	UserPlus,
	Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import TypewriterComponent from "typewriter-effect";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import Translations from "../Translations";
import { useMyContext } from "@/context/StateHolder";
import { useSession } from "next-auth/react";
import { ACTIONS } from "@/constants/action";
import useAdminSidebar from "@/hooks/useAdminSidebar";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
	{
		label: <Translations text="navigation.adminSidebar.addNewGame" />,

		icon: Plus,
		href: "/admin/dashboard/create-new-event",
		color: "text-violet-500",
	},
	{
		label: <Translations text="events.upcoming" />,

		icon: ArrowRight,
		color: "text-pink-700",
		href: "/admin/dashboard/upcoming-events",
	},
	{
		label: <Translations text="events.live" />,

		icon: RadioTower,
		color: "text-orange-700",
		href: "/admin/dashboard/live-events",
	},
	{
		label: <Translations text="events.past" />,

		icon: History,
		color: "text-emerald-500",
		href: "/admin/dashboard/past-events",
	},
	{
		label: <Translations text="navigation.adminSidebar.adminUsers" />,

		icon: Users,
		color: "text-green-700",
		href: "/admin/dashboard/users",
	},
	{
		label: <Translations text="navigation.adminSidebar.addNewAdmin" />,
		icon: UserPlus,
		href: "/admin/dashboard/users/create",

		color: "text-sky-500",
	},
	{
		label: <Translations text="navigation.adminSidebar.vismaSubID" />,

		icon: Settings,
		href: "/admin/dashboard/settings/payment",

		color: "text-violet-500",
	},
	{
		label: <Translations text="navigation.adminSidebar.gamesAnalytics" />,

		icon: PieChart,
		href: "/admin/dashboard/analytics/game-analytics",
		color: "text-sky-500",
	},
];

const AdminSidebar = () => {
	const [isMounted, setIsMounted] = useState(false);
	const pathname = usePathname();
	const session = useSession();
	const isSuperAdmin = session?.data?.user?.role === ACTIONS.SUPER_ADMIN;

	const { initialLanguageLoaded, currentClub } = useMyContext();

	const isOpen = useAdminSidebar((state) => state.isOpen);
	const onClose = useAdminSidebar((state) => state.onClose);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted || !initialLanguageLoaded) return <div className="sidebar" />;

	return (
		<div className="px-3 py-2 flex-1 bg-slate-900">
			<Link href="/admin/dashboard/create-new-event" className="flex items-center pl-3 mb-14">
				<h1 className={cn("text-2xl font-bold", poppins.className)}>
					<TypewriterComponent
						options={{
							strings: [
								isSuperAdmin
									? `${currentClub?.label} `
									: `${session?.data?.user?.user_organization_name}`,
							],
							autoStart: true,
							loop: true,
						}}
					/>
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

export default AdminSidebar;

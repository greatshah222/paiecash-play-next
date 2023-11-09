"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { NavigationMenuUser } from "./navigation-menu-user";
import { NavigationMenuLanguage } from "./navigation-menu-language";
import Translations from "../Translations";
import { useMyContext } from "@/context/StateHolder";
import useSidebar from "@/hooks/useSidebar";

const MainNav = ({ className }) => {
	const pathname = usePathname();
	const isOpen = useSidebar((state) => state.isOpen);
	const onClose = useSidebar((state) => state.onClose);

	const session = useSession();

	const [isMounted, setIsMounted] = useState(false);

	const { initialLanguageLoaded } = useMyContext();
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (session?.status === "loading" || !isMounted) {
		return (
			<nav className={cn("flex justify-between flex-1 ")}>
				<div
					className={cn(
						"hidden md:flex  items-center space-x-4 lg:space-x-6 text-xl  w-full",
						className
					)}
				/>
			</nav>
		);
	}

	const routes = [
		{
			href: `/clubs`,

			label: <Translations text="navigation.navbar.clubs" />,
			active: pathname === `/clubs`,
		},

		{
			href: `/events`,

			label: <Translations text="navigation.navbar.events" />,

			active: pathname === `/events`,
		},

		{
			href: `/search`,

			label: <Translations text="navigation.navbar.search" />,

			active: pathname === `/search`,
		},
	];

	const userRoutes = [
		{
			href: `/auth/login`,

			label: <Translations text="navigation.auth.login" />,

			active: true,
		},

		{
			href: `/auth/signup`,

			label: <Translations text="navigation.auth.register" />,

			active: true,
		},
	];

	const isLoggedIn = !!session?.data?.user;

	return (
		<nav className={cn("flex justify-between flex-1  ")}>
			<div
				className={cn(
					"hidden md:flex items-center space-x-0 md:space-x-4 lg:space-x-6 text-xl  w-full",
					className
				)}
			>
				{initialLanguageLoaded &&
					routes.map((el) => (
						<Link
							href={el?.href}
							key={el?.href}
							className={cn(
								"navbar_route",

								!el?.active ? "text-black" : "text-brand"
							)}
							target={el?.target && el?.target}
							// IF SIDE BAR IS OPENED WE CLOSE IT WHEN USER PRESSES THE ROUTE

							onClick={() => {
								isOpen && onClose();
							}}
						>
							{el?.label}
						</Link>
					))}
				{!isLoggedIn &&
					initialLanguageLoaded &&
					userRoutes.map((el) => (
						<Link
							href={el?.href}
							key={el?.href}
							className={cn(
								"navbar_route",

								el?.active ? "text-brandHover" : "text-brand"
							)}
							onClick={() => {
								isOpen && onClose();
							}}
						>
							{el?.label}
						</Link>
					))}

				{/* // LOGGED IN USER */}

				{isLoggedIn && initialLanguageLoaded && (
					<NavigationMenuUser role={session?.data?.user?.role} />
				)}

				{/* // SHOW IN SMALLER SCREEN i.e hidden from md and above */}

				<NavigationMenuLanguage className={"flex md:hidden min-w-full justify-end min-h-[55px]"} />
			</div>

			{/* // SHOW IN BIGGER SCREEN  - hidden intially and flex on md and above*/}

			<NavigationMenuLanguage className={"hidden md:flex w-auto"} />
		</nav>
	);
};

export default MainNav;

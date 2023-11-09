"use client";

import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { ACTIONS } from "@/constants/action";
import Translations from "../Translations";

export function NavigationMenuUser({ role }) {
	const [routes, setRoutes] = useState([]);

	const logout = async () => {
		try {
			signOut();

			function deleteAllCookies() {
				try {
					const cookies = document.cookie.split("; ");

					for (const cookie of cookies) {
						const [name, value] = cookie.split("=");
						// Set the expiration date to a past time (Thu, 01 Jan 1970 00:00:00 UTC) and include the Secure and Path attributes

						document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure;`;
					}
				} catch (error) {
					console.log(error);
				}
			}

			deleteAllCookies();
		} catch (error) {
			console.log(error);
		}
	};
	const user = [
		{
			title: <Translations text="navigation.auth.profile" />,
			href: "/user/user-detail",
		},

		{
			title: <Translations text="navigation.auth.logout" />,

			href: "/",
			onClick: () => {
				logout();
			},
		},
	];
	const admin = [
		{
			title: <Translations text="navigation.auth.dashboard" />,

			href: "/admin/dashboard/create-new-event",
		},
		{
			title: <Translations text="navigation.auth.profile" />,

			href: "/user/user-detail",
		},

		{
			title: <Translations text="navigation.auth.logout" />,

			href: "/",
			onClick: () => {
				logout();
			},
		},
	];
	const superadmin = [
		{
			title: <Translations text="navigation.auth.dashboard" />,

			href: "/admin/dashboard/create-new-event",
		},

		{
			title: <Translations text="navigation.auth.logout" />,

			onClick: () => {
				logout();
			},
		},
	];

	useEffect(() => {
		if (role === ACTIONS.USER) {
			setRoutes(user);
		} else if (role === ACTIONS.ADMIN) {
			setRoutes(admin);
		} else if (role === ACTIONS.SUPER_ADMIN) {
			setRoutes(superadmin);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [role]);

	return (
		<NavigationMenu className="z-30 justify-end md:justify-normal  min-w-full md:min-w-max min-h-[55px] md:min-h-max">
			{/* // FOR MOBILE SCREEN HAVE Z-30 MORE THAN DROPDOWN AND ONLY ON THIS PAGE */}
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-transparent text-brand text-lg font-medium font-probold w-full sm:w-auto">
						<Translations text="navigation.auth.profile" />
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[150px] sm:w-[130px] gap-3 p-4 text-center text-lg ">
							{routes.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component?.href}
									className="text-lg font-probold text-brand"
									onClick={component?.onClick}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef(({ className, title, onClick, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				{onClick ? (
					<div
						ref={ref}
						className={cn(
							"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
							className
						)}
						onClick={() => {
							onClick && onClick();
						}}
						{...props}
					>
						<div className="text-sm font-medium leading-none">{title}</div>
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
					</div>
				) : (
					<a
						ref={ref}
						className={cn(
							"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
							className
						)}
						{...props}
					>
						<div className="text-sm font-medium leading-none">{title}</div>
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
					</a>
				)}
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";

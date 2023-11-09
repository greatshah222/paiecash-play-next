"use client";

import * as React from "react";

import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";

import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useMyContext } from "@/context/StateHolder";

export function NavigationMenuLanguage({ className }) {
	const { i18n } = useTranslation();
	const [cookies, setCookie] = useCookies(["ln"]);

	const { setLanguageCode, setInitialLanguageLoaded } = useMyContext();

	const items = [
		{
			title: "FR",
			onClick: () => {
				languageChangeHandler("fr");
			},
		},
		{
			title: "FI",
			onClick: () => {
				languageChangeHandler("fi");
			},
		},
		{
			title: "EN",
			onClick: () => {
				languageChangeHandler("en");
			},
		},
	];
	const [languageDropdownTitle, setLanguageDropdownTitle] = React.useState(items?.[0]?.title);

	const languageChangeHandler = (code) => {
		if (code === "fi") {
			setLanguageDropdownTitle("FI");
		} else if (code === "en") {
			setLanguageDropdownTitle("EN");
		} else if (code === "fr") {
			setLanguageDropdownTitle("FR");
		}
		setCookie("ln", code, {
			path: "/",
			Secure: true,
			SameSite: "none",
		});

		i18n.changeLanguage(code);
		setLanguageCode(code);
	};
	React.useEffect(() => {
		if (cookies?.ln) {
			setLanguageCode(cookies?.ln);
			i18n.changeLanguage(cookies?.ln);
			let langMap = {
				en: "EN",
				fi: "FI",
				fr: "FR",
			};

			setLanguageDropdownTitle(langMap[cookies?.ln] ?? "FR");

			setInitialLanguageLoaded(true);
		} else {
			setInitialLanguageLoaded(true);
		}
	}, [cookies?.ln, setLanguageCode, i18n, setInitialLanguageLoaded]);

	return (
		<NavigationMenu className={cn(className)}>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-transparent text-brand text-lg font-medium font-probold w-full sm:w-auto">
						{languageDropdownTitle}
					</NavigationMenuTrigger>
					<NavigationMenuContent className="z-0">
						<ul className="grid w-[150px] sm:w-[130px] gap-3 p-4 text-center text-lg ">
							{items.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
									className="text-lg font-probold text-brand"
									onClick={component.onClick}
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

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
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
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";

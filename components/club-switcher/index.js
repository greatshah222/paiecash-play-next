"use client";
import { Check, ChevronsUpDown, StoreIcon } from "lucide-react";
import { useCallback, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMyContext } from "@/context/StateHolder";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import Translations from "../Translations";

const ClubSwitcher = ({ sortedOrganizationList, className }) => {
	const { currentClub, setCurrentClub } = useMyContext();
	const [cookies, setCookie] = useCookies(["currentClub"]);

	const [open, setOpen] = useState(false);
	const { t } = useTranslation();

	const router = useRouter();
	const saveInfoToCookies = useCallback(
		(el) => {
			setCookie("currentClub", el, {
				path: "/",
				Secure: true,
				SameSite: "none",
			});

			setCookie("supAdSec", el?.originalValue?.secret, {
				path: "/",
				Secure: true,
				SameSite: "none",
			});
			setCookie("supAdOrg", el?.originalValue?.organizationId, {
				path: "/",
				Secure: true,
				SameSite: "none",
			});
			setCookie("nodeonClubId", el?.originalValue?.nodeonClubId, {
				path: "/",
				Secure: true,
				SameSite: "none",
			});
		},
		[setCookie]
	);

	useEffect(() => {
		if (cookies?.currentClub) {
			setCurrentClub(cookies?.currentClub);
		} else {
			setCurrentClub(sortedOrganizationList?.[0]);
			saveInfoToCookies(sortedOrganizationList?.[0]);
		}
	}, [setCookie, setCurrentClub, cookies?.currentClub, sortedOrganizationList, saveInfoToCookies]);

	const onClubSelectHandler = (el) => {
		saveInfoToCookies(el);

		setTimeout(() => {
			setCurrentClub(el);
		}, 10);
		setOpen(false);
		router.refresh();
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					size={"sm"}
					role="combobox"
					aria-expanded={open}
					aria-label="Select a store"
					className={cn("w-[200px] justify-between h-full", className)}
				>
					<StoreIcon className="mr-2 h-4 w-4" />
					{currentClub?.label}
					<ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="max-w-sm p-0 font-probold text-brand mt-4 h-full md:h-auto ">
				<Command>
					<CommandList>
						<CommandInput placeholder={t("navigation.clubSwitcher.searchClub")} />
						<CommandEmpty>
							<Translations text="navigation.clubSwitcher.noClubFound" />.
						</CommandEmpty>

						<CommandGroup heading="Clubs">
							{sortedOrganizationList?.map((el) => (
								<CommandItem
									key={el?.value}
									onSelect={() => {
										onClubSelectHandler(el);
									}}
									className="text-sm cursor-pointer"
								>
									<StoreIcon className="mr-2 h-4 w-4" />
									{el?.label}

									<Check
										className={cn(
											"ml-auto h-4 w-4",
											currentClub?.value === el?.value ? "opacity-100" : "opacity-0",
											"text-brand"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default ClubSwitcher;

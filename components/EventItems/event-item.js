"use client";

import { useState } from "react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

import { momentDate } from "@/lib/momentDate";
import { Play } from "lucide-react";

const SHOW_ONLY_DATE = true;

const EventItem = ({ item, admin }) => {
	const [homeLogoSrc, setHomeLogoSrc] = useState(
		item.homeTeamLogoUrl
			? item.homeTeamLogoUrl
			: item.homeClubImage
			? item?.homeClubImage
			: "/images/default/default-club-logo.svg"
	);
	const [awayLogoSrc, setAwayLogoSrc] = useState(
		item.awayTeamLogoUrl
			? item.awayTeamLogoUrl
			: item.awayClubImage
			? item.awayClubImage
			: "/images/default/default-club-logo.svg"
	);

	let gameName = item?.name?.[item?.defaultLanguage] || item?.name?.["en_US"];
	return (
		<Link
			key={item.gameId}
			className={"min-h-200 border  border-brand rounded-md cursor-pointer h-full flex flex-col "}
			href={
				admin
					? `/admin/dashboard/event/${item?.organizationId}/${item?.gameId}`
					: `/event/${item?.organizationId}/${item?.eventId}`
			}
		>
			<div className="flex flex-col justify-around w-full h-full min-h-[150px] bg-white items-center rounded-md pt-5 ">
				<div className="flex justify-around items-center  w-full h-full">
					<Image
						src={homeLogoSrc}
						alt="Home Team"
						style={{
							borderRadius: item.homeClubImage ? "50px" : item.homeTeamLogoUrl ? "50px" : "0px",
						}}
						className="w-[80px] h-[80px]"
						width={80}
						height={80}
						onError={() => setHomeLogoSrc("/images/default/default-club-logo.svg")}
					/>
					<div className="px-[10px] py-[10px] border border-brand rounded-full">
						<Play className="text-brand" size={15} />
					</div>
					<Image
						src={awayLogoSrc}
						alt="Away Team"
						style={{
							borderRadius: item.awayClubImage ? "50px" : item.awayTeamLogoUrl ? "50px" : "0px",
						}}
						className="w-[80px] h-[80px]"
						width={80}
						height={80}
						onError={() => setAwayLogoSrc("/images/default/default-club-logo.svg")}
					/>
				</div>
				<div className="text-md text-brand text-center font-probold w-full">
					{gameName?.length > 30 ? `${gameName?.slice(0, 27)}...` : gameName}
				</div>
			</div>
			<div
				className={`px-2 py-3 flex text-center flex-col text-sm gap-2 h-[70px] min-h-[70px] max-h-[70px] bg-brand`}
			>
				<div>
					{item?.homeTeamName?.length > 20
						? `${item?.homeTeamName?.slice(0, 17)}...`
						: item?.homeTeamName}
					-
					{item?.awayTeamName?.length > 20
						? `${item?.awayTeamName?.slice(0, 17)}...`
						: item?.awayTeamName}
				</div>

				<div className={"flex gap-2 justify-center text-center"}>
					<div className="flex">
						{item?.seriesName && (
							<div className={"flex gap-2 justify-center text-center"}>
								<div>
									{item?.seriesName?.length > 20
										? `${item?.seriesName?.slice(0, 17)}...`
										: item?.seriesName}
								</div>
								<div>|</div>
							</div>
						)}
					</div>
					<div>
						{item?.startTimePublic
							? momentDate(item?.startTimePublic, SHOW_ONLY_DATE)
							: momentDate(item?.startTime, SHOW_ONLY_DATE)}
						{moment(item?.startTimePublic ? item?.startTimePublic : item?.startTime)
							.locale("fi")
							.format("HH:mm")}
					</div>
				</div>
			</div>
		</Link>
	);
};
export default EventItem;

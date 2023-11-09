"use client";

import { Calendar, Clock, HourglassIcon } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";

import Translations from "@/components/Translations";
import { Button } from "@/components/ui/button";
import AppConfig from "@/config";
import { convertDuration, momentDate } from "@/lib/momentDate";

const EventDesscription = ({
	isEventAccessgranted,
	isLocationAccessGranted,
	event,
	eventType,
	isPaidEvent,
}) => {
	const router = useRouter();

	const buyTicket = () => {
		router.push(`/packages/${event?.organizationId}/event/${event?.eventId}`);
	};
	return (
		<div className="font-probold">
			<div className="text-base flex gap-5 flex-col text-gray-950">
				<div className="flex gap-8 mt-10">
					<div>
						<Calendar />
					</div>
					<div>{momentDate(event?.startTimePublic, AppConfig.organization.language)}</div>
				</div>
				<div className="flex gap-8 ">
					<div>
						<Clock />
					</div>
					<div>
						{moment(event?.startTimePublic)
							.locale(AppConfig.language?.includes("en") ? "en" : "fi")
							.format("HH:mm")}
					</div>{" "}
				</div>
				{convertDuration(event?.duration) !== "0 s" && (
					<div className="flex gap-8  ">
						<div>
							<HourglassIcon />
						</div>
						<div>{convertDuration(event?.durationPublic)}</div>{" "}
					</div>
				)}
				{isPaidEvent && !isEventAccessgranted && (
					<Button
						onClick={buyTicket}
						className="min-w-[300px] w-[300px]  h-[50px] line-clamp-3 my-4 text-xl rounded-full	"
					>
						<Translations text="event.buyTicket" />
					</Button>
				)}
				<div
					className={`mt-6 font-regular leading-loose tracking-wider break-all text-gray-600  `}
					dangerouslySetInnerHTML={{
						__html: event?.description[event?.defaultLanguage || "en_US"],
					}}
				></div>
			</div>
		</div>
	);
};

export default EventDesscription;

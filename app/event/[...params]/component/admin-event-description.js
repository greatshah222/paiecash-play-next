"use client";
import { Calendar, Clock, HourglassIcon, Link as LinkIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";

import AppConfig from "@/config";
import { convertDuration, momentDate } from "@/lib/momentDate";
import Translations from "@/components/Translations";

const AdminEventDescription = ({ event, orgId, eventId }) => {
	return (
		<div className="font-probold px-4">
			<div className="text-base flex gap-5 flex-col text-gray-950">
				<div className="flex gap-6 mt-10">
					<div>
						<Calendar />
					</div>
					<div>{momentDate(event?.startTimePublic, AppConfig.organization.language)}</div>
				</div>
				<div className="flex gap-6 ">
					<div>
						<Clock />
					</div>
					<div>
						{moment(event?.startTimePublic)
							.locale(AppConfig.language?.includes("en") ? "en" : "fi")
							.format("LT")}
					</div>{" "}
				</div>
				{convertDuration(event?.duration) !== "0 s" && (
					<div className="flex gap-6  ">
						<div>
							<HourglassIcon />
						</div>
						<div>{convertDuration(event?.durationPublic)}</div>{" "}
					</div>
				)}

				<div className="flex gap-6 ">
					<div>
						<LinkIcon />
					</div>
					<Link href={`/event/${orgId}/${eventId}`} className="text-brandHover hover:text-brand">
						<Translations text="event.recordingPage" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AdminEventDescription;

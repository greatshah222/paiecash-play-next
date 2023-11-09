"use client";

import Countdown, { zeroPad } from "react-countdown";

import EventDesscription from "./event-description";
import Header from "@/components/ui/Header/header";
import Translations from "@/components/Translations";

const Renderer = ({ days, hours, minutes, seconds, completed, ...props }) => {
	return (
		<>
			<Header
				title={props?.props?.event?.name[props?.props?.event?.defaultLanguage || "en_US"]}
				className="font-trebleheavy font-normal  mb-5"
			/>
			<div className="flex items-center space-x-4 font-smallcase">
				<div className="flex flex-col justify-center items-center gap-2">
					<span className="p-4 sm:p-5  bg-black text-white font-bold text-4xl">
						{zeroPad(days)}
					</span>

					<div className="text-lg text-gray-700 sm:text-xl">
						<Translations text="event.days" />
					</div>
				</div>
				<div className="flex flex-col justify-center items-center gap-2">
					<span className="p-5 bg-black text-white font-bold text-4xl">{zeroPad(hours)}</span>

					<div className="text-lg text-gray-700 sm:text-xl">
						<Translations text="event.hours" />
					</div>
				</div>
				<div className="flex flex-col justify-center items-center gap-2">
					<span className="p-5 bg-black text-white font-bold text-4xl">{zeroPad(minutes)}</span>

					<div className="text-lg text-gray-700 sm:text-xl">
						<Translations text="event.minutes" />
					</div>
				</div>
				<div className="flex flex-col justify-center items-center gap-2">
					<span className="p-5 bg-black text-white font-bold text-4xl">{zeroPad(seconds)}</span>

					<div className="text-lg text-gray-700 sm:text-xl">
						<Translations text="event.seconds" />
					</div>
				</div>
			</div>
			<EventDesscription
				event={props?.props?.event}
				isEventAccessgranted={props?.props?.isEventAccessgranted}
				isLocationAccessGranted={props?.props?.isLocationAccessGranted}
				isPaidEvent={props?.props?.isPaidEvent}
				eventType={props?.props?.eventType}
			/>
		</>
	);
};

const UpcomingEvent = ({
	event,
	eventType,
	isPaidEvent,
	isEventAccessgranted,
	isLocationAccessGranted,
}) => {
	return (
		<Countdown
			date={event?.startTime}
			renderer={Renderer}
			event={event}
			isEventAccessgranted={isEventAccessgranted}
			isLocationAccessGranted={isLocationAccessGranted}
			isPaidEvent={isPaidEvent}
			eventType={eventType}
		/>
	);
};

export default UpcomingEvent;

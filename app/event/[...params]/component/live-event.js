"use client";

import { useState, useEffect } from "react";

import { Loader, RotateCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useCookies } from "react-cookie";

import { Button } from "@/components/ui/button";
import { getSingleEvent } from "@/utils/datahandler";
import { cn } from "@/lib/utils";

import EventDesscription from "./event-description";
import LivePlayer from "@/components/players/live-player";
import Header from "@/components/ui/Header/header";
import Translations from "@/components/Translations";

const TIMER_DURATION = 60;

const LiveEvent = ({
	event,
	eventType,
	isPaidEvent,
	isEventAccessgranted,
	isLocationAccessGranted,
	secret,
}) => {
	const { t } = useTranslation();

	const [cookies, setCookie] = useCookies("");

	useEffect(() => {
		if (cookies?.[`t-${event?.eventId}`]) {
			const storedTimestamp = parseInt(cookies?.[`t-${event?.eventId}`], 10);

			// Calculate the time difference in seconds
			const currentTimestamp = Date.now();
			const timeDifferenceInSeconds = (currentTimestamp - storedTimestamp) / 1000;

			const currDifferenceInDuration = Math.abs(TIMER_DURATION - timeDifferenceInSeconds);

			if (currDifferenceInDuration) {
				setStreamingButtonDisableDuration(currDifferenceInDuration);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [serviceOriginState, setServiceOriginState] = useState(event?.serviceOriginState);
	const [checkingOriginState, setCheckingOriginState] = useState(false);

	const [streamingButtonDisableDuration, setStreamingButtonDisableDuration] = useState(0);

	const checkForLiveStreamHandler = async () => {
		// we will send the api request again to check for origin status
		setCheckingOriginState(true);

		const res = await getSingleEvent(event?.organizationId, event?.eventId);

		if (res?.data?.status === "ok") {
			let currentServiceOriginState = res?.data?.event?.serviceOriginState;

			if (currentServiceOriginState * 1 !== 1) {
				setStreamingButtonDisableDuration(TIMER_DURATION);

				// WE ALSO HAVE TO SAVE THE TIMER IN THE COOKIES. LETS SAVE CURRENT TIME

				setCookie(`t-${event?.eventId}`, Date.now(), {
					path: "/",
					expires: new Date(Date.now() + TIMER_DURATION * 1000),
				});
			}
			setServiceOriginState(res?.data?.event?.serviceOriginState);
		} else {
			// no streaming is taking place .our server might be down or whatever reason api does not give us the data
			setServiceOriginState(0);
			setStreamingButtonDisableDuration(TIMER_DURATION);
		}

		setTimeout(() => {
			// giving timeout of 1s so user does not press it constantly
			setCheckingOriginState(false);
		}, 1000);
	};

	return (
		<div>
			{isEventAccessgranted &&
				(serviceOriginState === 1 ? (
					<LivePlayer
						channelServiceId={event?.serviceId}
						organizationId={event?.organizationId}
						playerConfig={{}}
						groupId={event?.groupId}
						secret={secret}
						eventId={event?.eventId}
					/>
				) : (
					<>
						<div className="flex justify-center items-center h-[50vh] bg-black flex-col gap-5 text-base">
							{!checkingOriginState && (
								<div className="font-600 text-white px-5 justify-center items-center">
									{t("players.notStreamingMessage")}
								</div>
							)}

							<Button
								onClick={checkForLiveStreamHandler}
								variant="primary"
								className="bg-brand text-white"
								disabled={checkingOriginState || streamingButtonDisableDuration}
							>
								<div className="flex justify-center items-center">
									{checkingOriginState ? (
										<div className="flex gap-2">
											<Loader size={15} />
											<div> {t("shared.loading")}</div>
										</div>
									) : (
										<div className="flex gap-2">
											<RotateCw size={15} />
											<div> {t("players.reloadStream")}</div>
										</div>
									)}
								</div>
							</Button>
							{streamingButtonDisableDuration && !checkingOriginState && (
								<div className="flex flex-col md:flex-row gap-2 justify-center items-center text-white text-sm">
									<div>
										<Translations text={"players.canCheckAgain"} />
									</div>
									<CountdownCircleTimer
										isPlaying
										duration={streamingButtonDisableDuration}
										colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
										colorsTime={[60, 50, 30, 0]}
										size={60}
										strokeWidth={2}
										onComplete={() => {
											setStreamingButtonDisableDuration(0);
										}}
									>
										{({ remainingTime }) => remainingTime}
									</CountdownCircleTimer>
									<div className="lowercase">
										<Translations text={"players.nSeconds"} />
									</div>
								</div>
							)}
						</div>
					</>
				))}

			<Header
				title={event?.name[event?.defaultLanguage || "en_US"]}
				className={cn("font-trebleheavy font-normal mb-5", isEventAccessgranted ? "mt-20" : "mt-0")}
			/>

			<EventDesscription
				event={event}
				isEventAccessgranted={isEventAccessgranted}
				isLocationAccessGranted={isLocationAccessGranted}
				isPaidEvent={isPaidEvent}
				eventType={eventType}
			/>
		</div>
	);
};

export default LiveEvent;

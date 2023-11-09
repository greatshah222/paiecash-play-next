"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

import useLoginModal from "@/hooks/useLoginModal";
import PastEvent from "./past-event";
import UpcomingEvent from "./upcoming-event";
import LiveEvent from "./live-event";

const SingleEventItem = ({
	isEventAccessgranted,
	isLocationAccessGranted,
	event,
	eventType,
	isPaidEvent,
	assetId,
	secret,
	allCampaigns,
}) => {
	const session = useSession();
	const isLoggedIn = !!session?.data;
	const isOpen = useLoginModal((state) => state.isOpen);
	const onOpen = useLoginModal((state) => state.onOpen);
	const onClose = useLoginModal((state) => state.onClose);

	// OPEN REDIRECT MODAL IF NOT LOGGED IN

	useEffect(() => {
		if (!isLoggedIn && !isOpen && session?.status !== "loading") {
			onOpen();
		}
		return () => {
			isOpen && onClose();
		};
	}, [isLoggedIn, onOpen, isOpen, onClose, session?.status]);

	if (!isLoggedIn) return null;

	if (eventType === "past") {
		return (
			<PastEvent
				isEventAccessgranted={isEventAccessgranted}
				isLocationAccessGranted={isLocationAccessGranted}
				isPaidEvent={isPaidEvent} // NOT SURE IF WE NEED THIS FOR NOW
				eventType={eventType}
				event={event}
				assetId={assetId} // THIS IS FOR RECORDING ID
				secret={secret}
				allCampaigns={allCampaigns}
			/>
		);
	} else if (eventType === "live") {
		return (
			<LiveEvent
				isEventAccessgranted={isEventAccessgranted}
				isLocationAccessGranted={isLocationAccessGranted}
				isPaidEvent={isPaidEvent}
				eventType={eventType}
				event={event}
				secret={secret}
			/>
		);
	} else {
		return (
			<UpcomingEvent
				event={event}
				isEventAccessgranted={isEventAccessgranted}
				isLocationAccessGranted={isLocationAccessGranted}
				isPaidEvent={isPaidEvent}
				eventType={eventType}
			/>
		);
	}
};

export default SingleEventItem;

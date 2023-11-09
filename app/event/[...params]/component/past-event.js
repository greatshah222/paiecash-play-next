"use client";

import { useState, useEffect } from "react";

import EventDesscription from "./event-description";
import Header from "@/components/ui/Header/header";
import EventAllRecordings from "./event-all-recordings";
import VodPlayer from "@/components/players/vod-player";
import { createAssetIdToken } from "@/lib/tokenCreation";
import { cn } from "@/lib/utils";

const PastEventWithRecording = ({
	event,
	assetId,

	eventType,
	isPaidEvent,
	isEventAccessgranted,
	isLocationAccessGranted,
	secret,
	allCampaigns,
}) => {
	return (
		<div>
			{isEventAccessgranted && (
				<VodPlayer
					asset={assetId}
					playerConfig={{}}
					organizationId={event?.organizationId}
					groupId={event?.groupId}
					allCampaigns={allCampaigns}
					host={""}
					assetToken={createAssetIdToken(event?.organizationId, assetId, "", secret)}
				/>
			)}

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

			{isEventAccessgranted && event?.recordings?.length > 1 && (
				<EventAllRecordings event={event} secret={secret} />
			)}
		</div>
	);
};
const PastEventWithoutRecording = ({
	event,

	eventType,
}) => {
	return (
		// http://localhost:3000/event/189838313/237322704
		<div>
			<Header
				title={event?.name[event?.defaultLanguage || "en_US"]}
				className="font-trebleheavy font-normal mt-20 mb-5"
			/>
			<EventDesscription
				event={event}
				isEventAccessgranted={true} // NO RECORDING SO ALLOW TO SEE THEM DESCRIPTION
				isLocationAccessGranted={true}
				isPaidEvent={false}
				eventType={eventType}
			/>
		</div>
	);
};

const PastEvent = ({
	event,
	assetId,

	eventType,
	isPaidEvent,
	isEventAccessgranted,
	isLocationAccessGranted,
	secret,
	allCampaigns,
}) => {
	const [isLoading, setIsLoading] = useState(true);

	const [recordingAssetId, setRecordingAssetId] = useState(assetId);

	useEffect(() => {
		setRecordingAssetId(assetId ? assetId : event?.recordings[0]?.assetId);
		setIsLoading(false);
	}, [assetId, event?.recordings]);

	return (
		!isLoading &&
		(recordingAssetId ? (
			<PastEventWithRecording
				event={event}
				assetId={recordingAssetId}
				isEventAccessgranted={isEventAccessgranted}
				isLocationAccessGranted={isLocationAccessGranted}
				isPaidEvent={isPaidEvent}
				eventType={eventType}
				secret={secret}
				allCampaigns={allCampaigns}
			/>
		) : (
			<PastEventWithoutRecording
				event={event}
				assetId={recordingAssetId}
				isEventAccessgranted={isEventAccessgranted}
				isLocationAccessGranted={isLocationAccessGranted}
				isPaidEvent={isPaidEvent}
				eventType={eventType}
			/>
		))
	);
};

export default PastEvent;

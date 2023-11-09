import { findSubOrganizationSecret, getActiveCampaign, getSingleEvent } from "@/utils/datahandler";
import SingleEventItem from "./component/single-event-item";
import checkEventUserAccess from "@/actions/check-event-user-access";
import { findEventType } from "@/lib/findEventType";
import Container from "@/components/ui/container";
import AppConfig from "@/config";

export async function generateMetadata({ params: { params } }) {
	const [organizationId, eventId] = params;

	const event = await getSingleEvent(organizationId, eventId);

	return {
		title: event?.data?.event?.name?.["en_US"],
		description: event?.data?.event?.description?.["en_US"],
	};
}

const EventPage = async ({ params: { params } }) => {
	const [organizationId, eventId, assetId] = params;

	const event = await getSingleEvent(organizationId, eventId);

	// console.log("event", event);

	const {
		ticketAccessgranted: isEventAccessgranted,
		locationGranted: isLocationAccessGranted,
		isPaidEvent,
	} = await checkEventUserAccess(event?.data?.event?.eventId, event?.data?.event);

	const eventType = findEventType(event?.data?.event);

	// lets find secret of organization

	let secret;

	if (eventType !== "upcoming") {
		// WE DONT NEED SECRET IN UPCOMING
		const orgSecretRes = await findSubOrganizationSecret(
			AppConfig.organization.organizationId,
			AppConfig.organization.key,
			organizationId
		);
		secret = orgSecretRes?.secret;
	}

	let allCampaigns;

	if (eventType === "past") {
		// WE NEED TO GET CAMPAIGNS AS WELL
		allCampaigns = await getActiveCampaign();
	}

	if (!allCampaigns) allCampaigns = [];

	return (
		<div className="bg-white text-gray-900 pt-10 pb-48">
			<Container className={" w-[94vw]  sm:w-[80vw]  sm:min-w-[60vw] mx-auto flex-1 "}>
				<SingleEventItem
					event={event?.data?.event}
					isEventAccessgranted={isEventAccessgranted}
					isLocationAccessGranted={isLocationAccessGranted}
					isPaidEvent={isPaidEvent}
					eventType={eventType}
					assetId={assetId}
					secret={secret}
					allCampaigns={allCampaigns}
				/>
			</Container>
		</div>
	);
};

export default EventPage;

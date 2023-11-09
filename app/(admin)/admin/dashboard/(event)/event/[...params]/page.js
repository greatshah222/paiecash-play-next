import AdminContainer from "@/components/admin-container";
import { findEventType } from "@/lib/findEventType";
import { getSingleEventAdmin } from "@/utils/datahandler";
import { Separator } from "@/components/ui/separator";
import ApiAlert from "../components/ApiAlert";
import AdminEventDescription from "@/app/event/[...params]/component/admin-event-description";
import AdminLivePlayer from "../components/admin-live-player";
import Header from "@/components/ui/Header/header";
import EventAction from "../components/event-action";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { checkScoreboardInitialStatus } from "@/actions/check-scoreboard-initial-status";

export async function generateMetadata({ params: { params } }) {
	const [organizationId, gameId] = params;

	const { token } = await getCurrentUser();

	const event = await getSingleEventAdmin(organizationId, gameId, token);

	return {
		title: `Admin/${event?.data?.game?.name?.["en_US"]}`,
		description: `Admin/${event?.data?.game?.name?.["en_US"]}`,
	};
}

const AdminEventPage = async ({ params: { params } }) => {
	const [organizationId, gameId] = params;
	const { token, secret } = await getCurrentUser();

	const event = await getSingleEventAdmin(organizationId, gameId, token);

	const eventType = findEventType(event?.data?.game);

	let { eventId, publishingInfo } = event?.data?.game?.event;

	let { serviceId, ingestUrl } = publishingInfo;

	let { isAlreadyInitiated, currentStreamScoreboardParams } = await checkScoreboardInitialStatus(
		serviceId,
		token,
		eventType,
		gameId
	);

	return (
		<>
			<AdminContainer className={"bg-white min-h-screen pb-20 px-5"}>
				<div className="flex justify-between items-center w-full">
					<Header
						title={event?.data?.game?.name?.[event?.data?.game?.defaultLanguage || "en_US"]}
					/>

					<EventAction gameId={gameId} token={token} organizationId={organizationId} />
				</div>

				{eventType === "live" && (
					<AdminLivePlayer
						organizationId={organizationId}
						channelServiceId={serviceId}
						groupId={event?.data?.game?.groupId}
						secret={secret}
						currentStreamScoreboardParams={currentStreamScoreboardParams}
						isAlreadyInitiated={isAlreadyInitiated}
						event={event?.data?.game}
						token={token}
						gameId={gameId}
						eventId={eventId}
					/>
				)}
				<AdminEventDescription
					event={event?.data?.game}
					orgId={organizationId}
					eventId={event?.data?.game?.eventId}
				/>

				<Separator className="mt-4" />

				{eventType !== "past" && (
					<div className="flex flex-col gap-4 mt-5">
						<ApiAlert title="event.streamingAddress" description={ingestUrl} />
						<ApiAlert title="event.streamKey" description={serviceId} />
					</div>
				)}
				{eventType === "past" && event?.data?.game?.event?.recordings?.length > 0 && (
					<div className="flex flex-col gap-4 mt-5">
						{event?.data?.game?.event?.recordings?.map((el) => (
							<ApiAlert
								key={el?.presetFileUrl}
								title="event.presetFileUrl"
								description={el?.presetFileUrl}
							/>
						))}
					</div>
				)}
			</AdminContainer>
		</>
	);
};

export default AdminEventPage;

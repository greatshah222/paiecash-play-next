import Events from "@/components/Events/events";
import Container from "@/components/ui/container";
import AppConfig from "@/config";

export const metadata = {
	title: "Events",
	description: "Events",
};

export default function EventsPage() {
	return (
		<Container className={"gap-y-10 flex flex-col"}>
			<Events organizationId={AppConfig.organization.organizationId} type="live" />
			<Events organizationId={AppConfig.organization.organizationId} type="upcoming" />
			<Events organizationId={AppConfig.organization.organizationId} type="past" />
		</Container>
	);
}

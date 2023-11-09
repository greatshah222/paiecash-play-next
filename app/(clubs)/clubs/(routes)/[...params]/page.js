import Container from "@/components/ui/container";
import ClubBanner from "../../component/club-banner";
import Events from "@/components/Events/events";

export async function generateMetadata({ params: { params } }) {
	const organizationName = params?.[0];

	return {
		title: `${decodeURIComponent(organizationName)}- detail`,
		description: `${decodeURIComponent(organizationName)}- detail`,
	};
}

const ClubPage = ({ params: { params } }) => {
	const orgId = params?.[1];

	const organizationName = params?.[0];

	return (
		<>
			<ClubBanner orgId={orgId} organizationName={organizationName} />
			<Container>
				<Events organizationId={orgId} type="live" limit={20} />
				<Events organizationId={orgId} type="upcoming" limit={20} />
				<Events organizationId={orgId} type="past" limit={20} />
			</Container>
		</>
	);
};

export default ClubPage;

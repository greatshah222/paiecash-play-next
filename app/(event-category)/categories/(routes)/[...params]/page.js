import EventCategoryItem from "@/app/(event-category)/components/event-category-item";
import Container from "@/components/ui/container";
import { getEventTitle } from "@/lib/getEventTitle";
import { getEventType } from "@/lib/getEventType";

export const metadata = {
	title: "Event categories",
	description: "Event categories",
};
const EventCategories = ({ params: { params } }) => {
	const [typeId, orgId] = params;

	const type = getEventType(typeId);
	const title = getEventTitle(typeId);

	return (
		<Container>
			<EventCategoryItem orgId={orgId} type={type} title={title} />
		</Container>
	);
};

export default EventCategories;

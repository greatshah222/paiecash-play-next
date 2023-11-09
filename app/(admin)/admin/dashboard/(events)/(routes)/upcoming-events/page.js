import EventCategoryItem from "@/app/(event-category)/components/event-category-item";
import AdminContainer from "@/components/admin-container";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const metadata = {
	title: "Admin/Upcoming events",
	description: "Admin/Upcoming events",
};

const AdminUpcomingEvents = async () => {
	let { organizationId } = await getCurrentUser();

	return (
		<AdminContainer className={"bg-white  px-5 min-h-screen"}>
			{/* // min-h-scrren is important */}
			<EventCategoryItem orgId={organizationId} type={"upcoming"} title={"events.upcoming"} admin />
		</AdminContainer>
	);
};

export default AdminUpcomingEvents;

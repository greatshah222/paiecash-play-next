import EventCategoryItem from "@/app/(event-category)/components/event-category-item";
import AdminContainer from "@/components/admin-container";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const metadata = {
	title: "Admin/Past events",
	description: "Admin/Past events",
};

const AdminPastEvents = async () => {
	let { organizationId } = await getCurrentUser();

	return (
		<AdminContainer className={"bg-white  px-5 min-h-screen"}>
			<EventCategoryItem orgId={organizationId} type={"past"} title={"events.past"} admin />
		</AdminContainer>
	);
};

export default AdminPastEvents;

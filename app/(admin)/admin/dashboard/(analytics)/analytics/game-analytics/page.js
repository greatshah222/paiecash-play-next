import AdminContainer from "@/components/admin-container";
import { getCurrentUser } from "@/lib/getCurrentUser";
import GamesAnalyticsClient from "./components/games-analytics-client";

export const metadata = {
	title: "Admin/Club Analytics",
	description: "Admin/Club Analytics",
};

const GamesAnalyticsPage = async () => {
	let { organizationId, secret } = await getCurrentUser();

	return (
		// SAME COLOR AS IFRAME
		<AdminContainer className={"bg-[#f4f6f8]"}>
			<GamesAnalyticsClient organizationId={organizationId} secret={secret} />
		</AdminContainer>
	);
};

export default GamesAnalyticsPage;

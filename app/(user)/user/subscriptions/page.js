import AdminContainer from "@/components/admin-container";
import AppConfig from "@/config";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getUser, getUserTickets } from "@/utils/datahandler";
import SubscriptionsPageClient from "./components/subscriptions-page-client";

export const metadata = {
	title: "Current Subscriptions",
	description: "Current Subscriptions",
};

const SubscriptionsPage = async () => {
	let { token, organizationId } = await getCurrentUser();

	const user = await getUser(token, organizationId);

	// NEED TO PASS PARENT ORG HERE IN CASE OF TICKETS

	const userTicketRes = await getUserTickets(
		AppConfig.organization.organizationId,
		token,
		AppConfig.organization.language
	);

	const userBuyerProduct = user?.data?.buyerProducts;
	const userTicketProduct = userTicketRes?.data?.data;

	return (
		<>
			<AdminContainer className={"bg-white h-full flex flex-col gap-10"}>
				<SubscriptionsPageClient title={"userprofile.subscription"} data={userBuyerProduct} />
				<SubscriptionsPageClient
					title={"userprofile.subscriptions.singlePurchase"}
					data={userTicketProduct}
				/>
			</AdminContainer>
		</>
	);
};

export default SubscriptionsPage;

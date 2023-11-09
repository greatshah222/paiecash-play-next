import { getCurrentUser } from "@/lib/getCurrentUser";
import { getAccountSettings } from "@/utils/datahandler";
import VismaClient from "./components/visma-client";
import AdminContainer from "@/components/admin-container";

export const metadata = {
	title: "Admin/Visma-settings",
	description: "Admin/Visma-settings",
};

const VismaSettingPaymentPage = async () => {
	let { token, organizationId } = await getCurrentUser();

	const res = await getAccountSettings(organizationId, token);

	return (
		<AdminContainer className={"bg-white h-full  w-full"}>
			<VismaClient
				subMerchantId={res?.data?.data?.vismaSubmerchantId}
				organizationId={organizationId}
				token={token}
			/>
		</AdminContainer>
	);
};

export default VismaSettingPaymentPage;

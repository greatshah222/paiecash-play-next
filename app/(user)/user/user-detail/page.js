import AdminContainer from "@/components/admin-container";
import UserDetailClient from "@/components/user-detail/user-detail-client";
import AppConfig from "@/config";
import { ACTIONS } from "@/constants/action";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getUser } from "@/utils/datahandler";

export const metadata = {
	title: "User Detail",
	description: "User Detail",
};

const UserDetail = async () => {
	let { token, userId, organizationId, role, secret } = await getCurrentUser();

	const user = await getUser(token, organizationId);

	return (
		<AdminContainer className={"bg-white w-full h-full"}>
			<UserDetailClient
				userId={userId}
				organizationId={
					role === ACTIONS.USER ? AppConfig.organization.organizationId : organizationId
				}
				secret={role === ACTIONS.USER ? AppConfig.organization.key : secret}
				token={token}
				profileData={user?.data}
			/>
		</AdminContainer>
	);
};

export default UserDetail;

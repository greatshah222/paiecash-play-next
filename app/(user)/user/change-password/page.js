import AdminContainer from "@/components/admin-container";
import ChangePasswordClient from "@/components/password/change-password-client";
import AppConfig from "@/config";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const metadata = {
	title: "Change Password",
	description: "Change Password",
};

const UserChangePassword = async () => {
	let { token, userId } = await getCurrentUser();

	// ACTUALLY ALL THE USER ARE SUBSCRIBER FOR MAIN PARENT ORG ID SO WE CAN PASS MAIN PARENT ORGID AND KEY

	return (
		<AdminContainer className={"bg-white w-full h-full"}>
			<ChangePasswordClient
				userId={userId}
				organization={AppConfig.organization.organizationId}
				secret={AppConfig.organization.key}
				token={token}
			/>
		</AdminContainer>
	);
};

export default UserChangePassword;

import AdminContainer from "@/components/admin-container";
import ChangePasswordClient from "@/components/password/change-password-client";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const metadata = {
	title: "Admin/Change password",
	description: "Admin/Change password",
};

const AdminChangePassword = async ({ params: { userId } }) => {
	let { organizationId, token, secret } = await getCurrentUser();

	return (
		<AdminContainer className={"bg-white h-full h-full w-full"}>
			<ChangePasswordClient
				userId={userId}
				organization={organizationId}
				secret={secret}
				token={token}
				admin
				callbackURL={"/admin/dashboard/users"}
			/>
		</AdminContainer>
	);
};

export default AdminChangePassword;

import AdminContainer from "@/components/admin-container";
import UserDetailClient from "@/components/user-detail/user-detail-client";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { fetchAllAdmins } from "@/utils/datahandler";

export const metadata = {
	title: "Admin/User detail",
	description: "Admin/User detail",
};

const AdminUserDetail = async ({ params: { userId } }) => {
	let { token, organizationId, secret } = await getCurrentUser();

	const allAdmins = await fetchAllAdmins(organizationId, token);

	const user = allAdmins?.data?.users?.find((el1) => el1.userId * 1 === userId * 1);

	// HERE WE NEED INFO OF ADMIN NOT THE LOGGED IN USER

	return (
		<AdminContainer className={"bg-white h-full px-5"}>
			<UserDetailClient
				userId={userId}
				organizationId={organizationId}
				secret={secret}
				token={token}
				profileData={user}
				admin
				callbackURL={"/admin/dashboard/users"}
			/>
		</AdminContainer>
	);
};

export default AdminUserDetail;

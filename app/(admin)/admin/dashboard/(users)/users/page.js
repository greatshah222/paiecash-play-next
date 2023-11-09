import AdminUsersClient from "./components/client";
import AdminContainer from "@/components/admin-container";
import { fetchAllAdmins } from "@/utils/datahandler";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const metadata = {
	title: "Admin/Users List",
	description: "Admin/Users List",
};

const AdminUsers = async () => {
	let { organizationId, token } = await getCurrentUser();

	const res = await fetchAllAdmins(organizationId, token);

	return (
		<AdminContainer className={"bg-white min-h-screen px-5"}>
			<AdminUsersClient data={res?.data?.users} />
		</AdminContainer>
	);
};

export default AdminUsers;

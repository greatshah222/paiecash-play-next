import SignupAuth from "@/app/(auth)/auth/signup/components/signup-auth";
import AdminContainer from "@/components/admin-container";
import { ACTIONS } from "@/constants/action";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const metadata = {
	title: "Admin/Create user",
	description: "Admin/Create user",
};

const CreateAdminPage = async () => {
	let { organizationId, secret } = await getCurrentUser();

	return (
		<AdminContainer className={"bg-white h-full"}>
			<SignupAuth
				role={ACTIONS.ADMIN}
				adminOrganization={organizationId}
				adminSecret={secret}
				customReturnUrl={"/admin/dashboard/users"}
			/>
			;
		</AdminContainer>
	);
};

export default CreateAdminPage;

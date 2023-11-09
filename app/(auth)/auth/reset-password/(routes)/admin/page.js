import Container from "@/components/ui/container";
import { ACTIONS } from "@/constants/action";
import ResetPasswordForm from "../../components/reset-password-form";

export const metadata = {
	title: "Admin/Reset password",
	description: "Admin/Reset password",
};

const ResetPasswordAdminPage = ({ searchParams: { token } }) => {
	if (!token) {
		return (
			<div className="bg-white w-full h-full">
				<Container className={"form-primary sm:py-20"}>
					<ResetPasswordForm role={ACTIONS.ADMIN} />
				</Container>
			</div>
		);
	}
};

export default ResetPasswordAdminPage;

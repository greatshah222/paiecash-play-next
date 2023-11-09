import Container from "@/components/ui/container";
import ResetPasswordForm from "../components/reset-password-form";
import { validatePasswordResetToken } from "@/utils/datahandler";
import PasswordInvalidToken from "../components/password-invalid-token";
import PasswordValidToken from "../components/password-valid-token";

export const metadata = {
	title: "Reset password",
	description: "Reset password",
};

const ResetPasswordPage = async ({ searchParams: { token } }) => {
	let isTokenValid = false;
	if (token) {
		const res = await validatePasswordResetToken(token);

		if (res?.data?.status === "ok") {
			isTokenValid = true;
		}
	}
	if (!token) {
		return (
			<div className="bg-white w-full h-full">
				<Container className={"form-primary sm:py-20"}>
					<ResetPasswordForm />
				</Container>
			</div>
		);
	}

	if (token && !isTokenValid) {
		return (
			<div className="bg-white w-full h-full">
				<Container className={"form-primary sm:py-20"}>
					<PasswordInvalidToken />;
				</Container>
			</div>
		);
	}

	if (token && isTokenValid) {
		return (
			<div className="bg-white w-full h-full">
				<Container className={"form-primary sm:py-20"}>
					<PasswordValidToken token={token} />
				</Container>
			</div>
		);
	}

	return null;
};

export default ResetPasswordPage;

import { ACTIONS } from "@/constants/action";
import AuthPage from "../../components/auth";

export const metadata = {
	title: "Admin/Login",
	description: "Admin/Login",
};

const LoginAdminPage = () => {
	return <AuthPage role={ACTIONS.ADMIN} />;
};

export default LoginAdminPage;

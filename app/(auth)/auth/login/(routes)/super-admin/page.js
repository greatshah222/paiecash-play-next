import { ACTIONS } from "@/constants/action";
import AuthPage from "../../components/auth";

export const metadata = {
	title: "Superadmin/Login",
	description: "Superadmin/Login",
};

const LoginSuperAdminPage = () => {
	return <AuthPage role={ACTIONS.SUPER_ADMIN} className={"md:bg-[whitesmoke] "} />;
};

export default LoginSuperAdminPage;

import AuthPage from "../components/auth";
import { ACTIONS } from "@/constants/action";

export const metadata = {
	title: "Login",
	description: "Login",
};

const LoginPage = () => {
	return <AuthPage role={ACTIONS.USER} />;
};

export default LoginPage;

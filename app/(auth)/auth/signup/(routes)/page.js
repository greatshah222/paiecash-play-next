import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import SignupAuth from "../components/signup-auth";
import { ACTIONS } from "@/constants/action";

export const metadata = {
	title: "Register to Salibandytv",
	description: "Register to Salibandytv",
};
const SignupPage = async () => {
	const session = await getServerSession(authOptions);

	if (session?.user?.user_id) {
		redirect("/");
	}

	return <SignupAuth role={ACTIONS.USER} />;
};

export default SignupPage;

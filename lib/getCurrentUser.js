import { ACTIONS } from "@/constants/action";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
	const cookieStore = cookies();
	const session = await getServerSession(authOptions);
	let organizationId, secret, userId;

	if (session?.user?.role === ACTIONS.SUPER_ADMIN) {
		// GET SUPER ADMIN VALUE FROM COOKIES
		organizationId = cookieStore?.get("supAdOrg")?.value;
		secret = cookieStore?.get("supAdSec")?.value;
	} else {
		// GET FROM NEXT AUTH PROVIDER
		organizationId = session?.user?.user_organization_id;
		secret = session?.user?.user_secret;
		userId = session?.user?.user_id;
	}
	return {
		organizationId: organizationId,
		token: session?.user?.user_token,
		secret,
		userId: userId,
		role: session?.user?.role,
	};
};

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

import Container from "@/components/ui/container";
import { useForm } from "@/hooks/form-hook";
import { cn } from "@/lib/utils";
import SignupForm from "./signup-form";
import { createAdminUserToken } from "@/lib/tokenCreation";
import AppConfig from "@/config";
import { registerUser } from "@/utils/datahandler";
import { ACTIONS } from "@/constants/action";
import { useTranslation } from "react-i18next";

const SignupAuth = ({ role, className, customReturnUrl, adminOrganization, adminSecret }) => {
	const router = useRouter();
	const searchParam = useSearchParams();
	const session = useSession();
	const returnQuery = searchParam?.get("callbackUrl");
	const { t } = useTranslation();

	const [loading, setLoading] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	const [state, InputHandler] = useForm(
		{
			EMAIL: {
				value: "",
				isValid: false,
			},
			PASSWORD: {
				value: "",
				isValid: false,
			},
			PASSWORDCONFIRM: {
				value: "",
				isValid: false,
			},
		},
		false
		// the last false defines if the whole form is valid or not ( since we have set all isvalid to false so our total form validity will also be false)
	);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted || session?.status === "loading") return null;
	// if (session?.data && role !== "admin") {
	// 	// IF USER ROLE IS ADMIN WE ALLOW THEM TO CREATE MORE ADMIN FROM CONTROL PANEL
	// 	return router.push("/");
	// }

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);

		// FROM ADMIN PANEL WE NEED CUSTOM retunURL instead redirecting to LOGIN PAGE
		const returnUrl = customReturnUrl || returnQuery || "/auth/login";

		let token,
			organizationId = AppConfig.organization.organizationId;

		if (role === ACTIONS.ADMIN) {
			// WE PASS THESE VALUE AS A PROPS
			organizationId = adminOrganization;

			token = createAdminUserToken(adminOrganization, adminSecret);
		}
		try {
			// admin account will be created on child account but other normal users will be created on parent account

			let res = await registerUser(organizationId, state.inputs, role, token);
			if (res?.status === 200 && res?.data?.status === "ok") {
				if (role === ACTIONS.ADMIN) {
					toast.success(t("form.user.adminCreated"));
				}
				router.push(returnUrl);
			} else {
				toast.error(res?.data?.message || t("shared.errorGeneric"));
			}
		} catch (error) {
			toast.error(t("shared.errorGeneric"));
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-white w-full h-full">
			<Container className={cn(" max-w-[600px] w-full lg:w-[600px] lg:max-w-[600px]", className)}>
				<SignupForm
					state={state}
					InputHandler={InputHandler}
					formSubmitHandler={formSubmitHandler}
					loading={loading}
					role={role}
				/>
			</Container>
		</div>
	);
};

export default SignupAuth;

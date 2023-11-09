"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

import LoginForm from "./login-form";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/container";
import { useForm } from "@/hooks/form-hook";
import { useTranslation } from "react-i18next";

const AuthPage = ({ role, className }) => {
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
		},
		false
		// the last false defines if the whole form is valid or not ( since we have set all isvalid to false so our total form validity will also be false)
	);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted || session?.status === "loading") return null;
	// if (session?.data) {
	// 	return router.push("/");
	// }

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		const returnUrl = returnQuery || "/";

		try {
			let res = await signIn(
				"credentials",

				{
					username: state.inputs.EMAIL.value,
					password: state.inputs.PASSWORD.value,
					role: role,
					redirect: false,
				}
			);

			if (res?.status === 200) {
				router.refresh();
				router.push(returnUrl);
			} else {
				toast.error(res?.error || t("shared.errorGeneric"));
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
				<LoginForm
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

export default AuthPage;

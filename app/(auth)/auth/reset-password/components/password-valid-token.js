"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import ChangePasswordForm from "@/components/password/change-password-form";
import { useForm } from "@/hooks/form-hook";
import { resetPasswordChange } from "@/utils/datahandler";

const PasswordValidToken = ({ token }) => {
	const { t } = useTranslation();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const [state, InputHandler] = useForm(
		{
			PASSWORD: {
				value: "",
				isValid: false,
			},
			PASSWORD_CONFIRM: {
				value: "",
				isValid: false,
			},
		},
		false
		// the last false defines if the whole form is valid or not ( since we have set all isvalid to false so our total form validity will also be false)
	);

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await resetPasswordChange(
				state.inputs.PASSWORD.value,
				state.inputs.PASSWORD_CONFIRM.value,
				token
			);
			response?.data?.status === "ok"
				? toast.success(t("form.password.passwordChangedSuccess"))
				: toast.error(response?.data?.message || t("shared.errorGeneric"));

			if (response?.data?.status === "ok") {
				// we send them to main page
				setIsLoading(false);
				setTimeout(() => {
					// they cant come back
					router.replace("/");
				}, 1000);
			} else {
				setIsLoading(false);
			}
		} catch (error) {
			setIsLoading(false);
			toast.error(t("shared.errorGeneric"));
			console.log(error);
		}
	};
	return (
		<ChangePasswordForm
			isLoading={isLoading}
			formSubmitHandler={formSubmitHandler}
			state={state}
			InputHandler={InputHandler}
		/>
	);
};

export default PasswordValidToken;

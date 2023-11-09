"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import ChangePasswordForm from "@/components/password/change-password-form";
import { useForm } from "@/hooks/form-hook";
import { changePassword } from "@/utils/datahandler";

const ChangePasswordClient = ({ organization, secret, userId, token, admin, callbackURL }) => {
	const [isLoading, setIsLoading] = useState(false);

	const { t } = useTranslation();

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
			OLD_PASSWORD: {
				value: "",
				isValid: admin ? true : false,
			},
		},
		false
		// the last false defines if the whole form is valid or not ( since we have set all isvalid to false so our total form validity will also be false)
	);
	const formSubmitHandler = async (e) => {
		try {
			e.preventDefault();
			setIsLoading(true);

			const res = await changePassword(
				organization,
				secret,
				userId,
				state.inputs.PASSWORD.value,
				state.inputs.PASSWORD_CONFIRM.value,
				state.inputs.OLD_PASSWORD.value,
				token
			);

			if (res?.data?.status === "ok") {
				toast.success(t("form.password.changedSuccess"));
				setIsLoading(false);

				callbackURL && router.push(callbackURL);
			} else {
				toast.error(res?.data?.message || t("shared.errorGeneric"));
			}
		} catch (error) {
			toast.error(t("shared.errorGeneric"));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ChangePasswordForm
			isLoading={isLoading}
			formSubmitHandler={formSubmitHandler}
			state={state}
			InputHandler={InputHandler}
			className={"  max-w-[600px] w-full  p-5 sm:p-10"}
			includeOldPassword={admin ? false : true}
		/>
	);
};

export default ChangePasswordClient;

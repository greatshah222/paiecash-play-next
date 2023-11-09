"use client";
import { useForm } from "@/hooks/form-hook";
import { updateUser } from "@/utils/datahandler";
import UserDetailForm from "./user-detail-form";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const UserDetailClient = ({
	organizationId,
	secret,
	userId,
	token,
	admin,
	callbackURL,
	profileData,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	const { t } = useTranslation();
	const router = useRouter();

	const [state, InputHandler] = useForm(
		{
			FIRSTNAME: {
				value: "",
				isValid: true,
			},
			LASTNAME: {
				value: "",
				isValid: true,
			},
			EMAIL: {
				value: "",
				isValid: true,
			},
		},
		true
		// the last false defines if the whole form is valid or not ( since we have set all isvalid to false so our total form validity will also be false)
	);

	const formSubmitHandler = async (e) => {
		try {
			e.preventDefault();
			setIsLoading(true);

			const res = await updateUser(
				userId,
				token,
				organizationId,
				secret,
				state.inputs.FIRSTNAME.value ? state.inputs.FIRSTNAME.value : "-",
				state.inputs.LASTNAME.value ? state.inputs.LASTNAME.value : "-",
				profileData?.phone,
				profileData.countryId,
				profileData.regionId,
				profileData.city,
				profileData.postalCode,
				state.inputs.EMAIL.value,
				admin
				// this userid is of user which we are trying to change from admin panel
			);

			if (res?.data?.status === "ok") {
				toast.success(t("form.profile.info"));
				setIsLoading(false);

				if (callbackURL) {
					router.refresh();
					router.push(callbackURL);
				}
			} else {
				toast.error(res?.data?.message || t("shared.errorGeneric"));
			}
		} catch (error) {
			toast.error(t("shared.errorGeneric"));
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;
	return (
		<UserDetailForm
			isLoading={isLoading}
			formSubmitHandler={formSubmitHandler}
			state={state}
			InputHandler={InputHandler}
			className={"max-w-[600px] w-full  p-5 sm:p-10"}
			profileData={profileData}
			admin={admin}
		/>
	);
};

export default UserDetailClient;

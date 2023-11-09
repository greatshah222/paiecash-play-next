"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/Input/Input";
import { VALIDATOR_REQUIRE } from "@/components/ui/Validation/Validator";
import { Button } from "@/components/ui/button";
import { useForm } from "@/hooks/form-hook";
import { updateAccountSettings } from "@/utils/datahandler";
import Translations from "@/components/Translations";
import InfoAlert from "@/components/info-alert";

const VismaClient = ({ subMerchantId, organizationId, token }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { t } = useTranslation();
	const [state, InputHandler] = useForm(
		{
			SUBMERCHANTID: {
				value: "",
				isValid: true,
			},
		},
		false
		// the last false defines if the whole form is valid or not ( since we have set all isvalid to false so our total form validity will also be false)
	);
	const formSubmitHandler = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		let settings = {
			vismaSubmerchantId: state.inputs.SUBMERCHANTID.value,
		};

		try {
			let res = await updateAccountSettings(organizationId, token, settings);

			if (res?.data?.status === "ok") {
				toast.success(t("settings.visma.updateSuccess"));
			} else {
				toast.error(t("settings.visma.updateFailure"));
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<form className={"max-w-3xl mx-auto font-regular w-full  p-5"} onSubmit={formSubmitHandler}>
				<h1 className="py-5 text-brand font-probold  text-4xl">
					<Translations text="Visma submerchat settings" />
				</h1>

				<Input
					id="SUBMERCHANTID"
					label={<Translations text="settings.visma.submerchantId" />}
					placeholder={""}
					type="text"
					element="input"
					validators={[VALIDATOR_REQUIRE()]}
					errorText={""}
					onInput={InputHandler}
					initialValue={subMerchantId}
					initialValid={subMerchantId ? true : false}
				/>

				<Button
					className={`w-full bg-brand min-h-[50px] text-md rounded-full font-probold`}
					disabled={!state.isValid || isLoading}
					aria-label="Change visma submerchant id"
				>
					{isLoading ? (
						<Translations text="shared.loading" />
					) : (
						<Translations text="shared.submit" />
					)}
				</Button>
			</form>

			<div className="mt-28  max-w-3xl mx-auto">
				<InfoAlert text={"settings.visma.helpText"} />
			</div>
		</>
	);
};

export default VismaClient;

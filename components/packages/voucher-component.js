"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AppConfig from "@/config";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/button";
import { useForm } from "@/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "@/components/ui/Validation/Validator";
import { voucherPurchase } from "@/utils/datahandler";

const VoucherComponent = ({
	moveToReceipt,
	selectedPackage,
	setVoucherView,
	mainOrganizationPackage,
}) => {
	const { t } = useTranslation();

	const { organizationId } = AppConfig.organization;
	const { language } = AppConfig.organization;

	const [apiError, setApiError] = useState(null);

	const session = useSession();

	const [state, InputHandler] = useForm(
		{
			VOUCHERCODE: {
				value: "",
				isValid: false,
			},
		},
		false
		// the last false defines if the whole form is valid or not ( since we have set all isvalid to false so our total form validity will also be false)
	);

	const voucherButtonAction = async () => {
		let isMainOrganizationPackage = !!mainOrganizationPackage.find(
			(el) => el?.id === selectedPackage.id
		); // THIS MEANS PACKAGE IS NOT OF TYPE TICKET AND WHEN IT IS NOT TICKET WE HAVE TO PROVIDE TICKET QUANITY AS 0 AND USER TOKEN TO API

		const voucherPurchaseResponse = await voucherPurchase(
			session?.data?.user?.user_token,
			language,
			organizationId,
			selectedPackage.id,
			state.inputs.VOUCHERCODE.value,

			isMainOrganizationPackage ? 0 : 1,
			session?.data?.user?.user_email
			// If the package is of not type ticket we have to provide quantity as 0
		);

		if (voucherPurchaseResponse?.data?.status === "ok") {
			setApiError(null);
			moveToReceipt();
		} else {
			setApiError(getErrorMsgTranslation(voucherPurchaseResponse?.data?.errorCode));
		}
	};

	const getErrorMsgTranslation = (errorCode) => {
		return t("packages.VoucherErrorCode" + errorCode);
	};

	return (
		<div className={`max-w-[600px] py-6 w-full `}>
			<div className={`text-md text-gray-800 my-2`}>{t("packages.VoucherTitle")}</div>
			<Input
				id="VOUCHERCODE"
				label="VOUCHERCODE"
				placeholder={t("packages.GiveVoucherCode")}
				type="text"
				element="input"
				validators={[VALIDATOR_REQUIRE()]}
				errorText={t("packages.VoucherCheckCode")}
				onInput={InputHandler}
				style={{
					borderRadius: "0",
				}}
			/>
			{apiError && <div className={"text-red-600 text-xs text-center my-4"}>{apiError}</div>}
			<div className={"flex gap-5 max-w-[60%] justify-center items-center mx-auto"}>
				<Button
					id="okButton"
					name="okButton"
					onClick={() => voucherButtonAction()}
					inverse
					aria-label={"Ok"}
					disabled={!state.isValid}
					className="w-full"
				>
					<div>{t("shared.confirm")}</div>
				</Button>
				<Button
					id="cancelButton"
					name="cancelButton"
					onClick={() => setVoucherView(false)}
					danger
					aria-label={"cancel"}
					className="w-full"
					variant="destructive"
				>
					<div>{t("shared.cancel")}</div>
				</Button>
			</div>
		</div>
	);
};

export default VoucherComponent;

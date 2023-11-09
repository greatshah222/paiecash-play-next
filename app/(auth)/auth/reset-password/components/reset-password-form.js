"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Link from "next/link";

import Translations from "@/components/Translations";
import { Input } from "@/components/ui/Input/Input";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "@/components/ui/Validation/Validator";
import { Button } from "@/components/ui/button";
import AppConfig from "@/config";
import { ACTIONS } from "@/constants/action";
import { useForm } from "@/hooks/form-hook";
import { resetPasswordToken } from "@/lib/tokenCreation";
import { requestResetPassword } from "@/utils/datahandler";

const PasswordForm = ({ InputHandler, state, formSubmitHandler, loading, role }) => {
	const { t } = useTranslation();
	return (
		<form className={"max-w-2xl mx-auto font-regular "} onSubmit={formSubmitHandler}>
			<h1 className="py-5 text-black font-probold  text-4xl">
				{role === ACTIONS.ADMIN ? (
					<Translations text="form.password.forgotAdminPassword" />
				) : (
					<Translations text="form.password.forgotUserPassword" />
				)}
			</h1>

			<Input
				id="EMAIL"
				label={<Translations text="form.user.email" />}
				placeholder={<Translations text="form.user.enterEmail" />}
				type="text"
				element="input"
				validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
				errorText={<Translations text="form.user.enterValidEmail" />}
				onInput={InputHandler}
			/>

			<Button
				className={`w-full  min-h-[50px] text-md rounded-full font-probold`}
				disabled={!state.isValid || loading}
				aria-label="reset password"
			>
				{loading ? <Translations text="shared.loading" /> : <Translations text="shared.submit" />}
			</Button>
			<p className="text-black text-xs my-5 flex flex-wrap text-center justify-center">
				<Translations text="form.password.resetEmailInstruction" />
			</p>

			{
				<div
					className={
						"text-xs text-black mt-14 flex flex-row  gap-2 justify-center text-center flex-wrap"
					}
				>
					<div className={"flex gap-2 items-center text-center flex-row"}>
						<div className="text-black">
							{role === ACTIONS.ADMIN ? (
								<Translations text="form.password.forgotUserPassword" />
							) : (
								<Translations text="form.password.forgotAdminPassword" />
							)}
						</div>
						<Link
							href={role === ACTIONS.ADMIN ? `/auth/reset-password` : `/auth/reset-password/admin`}
							className={"bg-brandHover py-[2px] px-2 border rounded-full font-probold text-white"}
						>
							<Translations text="shared.clickHere" />
						</Link>
					</div>
				</div>
			}
		</form>
	);
};
const ResetEmailSuccess = () => {
	const router = useRouter();
	return (
		<div className="flex flex-col gap-2 w-full ">
			<h1 className="py-5 text-black font-probold  text-4xl">
				<Translations text="form.password.passwordLinkSent" />
			</h1>
			<p className="text-black text-md flex flex-wrap">
				<Translations text="form.password.passwordLinkMsg" />
			</p>

			<Button variant="link" onClick={() => router.push("/")} aria-label="Back to home page">
				<Translations text="shared.home" />
			</Button>
		</div>
	);
};

const ResetPasswordForm = ({ role = ACTIONS.USER }) => {
	const [loading, setLoading] = useState(false);
	const [resetEmailSent, setResetEmailSent] = useState(false);

	const [state, InputHandler] = useForm(
		{
			EMAIL: {
				value: "",
				isValid: false,
			},
		},
		false
		// the last false defines if the whole form is valid or not ( since we have set all isvalid to false so our total form validity will also be false)
	);
	const formSubmitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const token = resetPasswordToken(
				state.inputs.EMAIL.value,
				AppConfig.organization.organizationId,

				role,
				AppConfig.organization.key
			);

			const res = await requestResetPassword(
				state.inputs.EMAIL.value,
				AppConfig.organization.organizationId,

				role,
				token
			);
			if (res?.data?.status === "ok") {
				setResetEmailSent(true);
			} else if (res?.data?.status === "error") {
				toast.error(t("form.user.emailDoesnotExist"));
			} else {
				// this basically means our servers are down
				toast.error(t("shared.errorGeneric"));
			}
		} catch (error) {
			toast.error(t("shared.errorGeneric"));
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	return resetEmailSent ? (
		<ResetEmailSuccess />
	) : (
		<PasswordForm
			state={state}
			InputHandler={InputHandler}
			formSubmitHandler={formSubmitHandler}
			loading={loading}
			role={role}
		/>
	);
};
export default ResetPasswordForm;

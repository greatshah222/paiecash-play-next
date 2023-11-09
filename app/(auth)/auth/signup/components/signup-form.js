"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import Translations from "@/components/Translations";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/button";

import {
	VALIDATOR_EMAIL,
	VALIDATOR_PASSWORDMATCH,
	VALIDATOR_REQUIRE,
} from "@/components/ui/Validation/Validator";
import { ACTIONS } from "@/constants/action";

const SignupForm = ({ state, InputHandler, formSubmitHandler, loading, role }) => {
	const { t } = useTranslation();
	let heading = t("navigation.auth.register");

	if (role === ACTIONS.ADMIN) {
		heading = t("form.user.createNewAdmin");
	}

	return (
		<form className={"max-w-2xl mx-auto font-regular "} onSubmit={formSubmitHandler}>
			<h1 className="my-5 text-black font-probold  text-4xl">{heading}</h1>

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

			<Input
				id="PASSWORD"
				label={<Translations text="form.password.password" />}
				placeholder={<Translations text="form.password.enterPassword" />}
				errorText={<Translations text="form.password.passwordRequired" />}
				type="Password"
				element="input"
				validators={[VALIDATOR_REQUIRE()]}
				onInput={InputHandler}
			/>
			<Input
				id="PASSWORDCONFIRM"
				label={<Translations text="form.password.passwordConfirm" />}
				placeholder={<Translations text="form.password.enterPassword" />}
				errorText={<Translations text="form.password.passwordMismatch" />}
				type="Password"
				element="input"
				validators={[
					VALIDATOR_PASSWORDMATCH(state.inputs.PASSWORD.value, state.inputs.PASSWORDCONFIRM.value),
				]}
				onInput={InputHandler}
			/>

			<Button
				className={`w-full  min-h-[50px] text-md rounded-full font-probold`}
				disabled={!state.isValid || loading}
				aria-label="Login to Salibandytv"
			>
				{loading ? <Translations text="shared.loading" /> : t("navigation.auth.register")}
			</Button>

			{/* // WE DONT SHOW FOLLOWING FROM ADMIN PANEL */}

			{role !== ACTIONS.ADMIN && role !== ACTIONS.SUPER_ADMIN && (
				<>
					<div className="text-xs text-center  text-gray-600 mt-5 hover:text-brand ">
						<Link href="/tos">{t("form.user.agreeOnTerms")}</Link>
					</div>
					<div
						className={
							"text-xs text-brand mt-10 flex flex-row  gap-2 justify-center text-center flex-wrap"
						}
					>
						<div className={"flex gap-2 items-center text-center flex-row"}>
							<div className="text-black">
								<Translations text="form.password.forgotPassword" />
							</div>
							<Link
								href={`/auth/reset-password`}
								className={
									"bg-brandHover text-white py-[2px] px-2 border rounded-full font-probold"
								}
							>
								<Translations text="shared.clickHere" />
							</Link>
						</div>
						<div
							className={
								"flex gap-2 items-center text-center flex-row justify-start md:justify-center "
							}
						>
							<div className="text-black">
								<Translations text="form.user.alreadyHaveAccount" />
							</div>
							<Link
								href={`/auth/login`}
								className={
									"bg-brandHover text-white py-[2px] px-2 border rounded-full font-probold"
								}
							>
								<Translations text="shared.clickHere" />
							</Link>
						</div>
					</div>
				</>
			)}
		</form>
	);
};

export default SignupForm;

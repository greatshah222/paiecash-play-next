"use client";

import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import Link from "next/link";

import Translations from "@/components/Translations";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/button";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "@/components/ui/Validation/Validator";
import { ACTIONS } from "@/constants/action";

const LoginForm = ({ state, InputHandler, formSubmitHandler, loading, role }) => {
	const session = useSession();
	const { t } = useTranslation();

	let loginAs = t("form.user.loginAsAdmin");
	let heading = t("navigation.auth.login");

	if (role === ACTIONS.ADMIN) {
		loginAs = t("form.user.loginAsUser");
		heading = ` ${t("navigation.auth.login")} ${t("form.user.admin").toLowerCase()}`;
	} else if (role === ACTIONS.USER) {
		loginAs = t("form.user.loginAsAdmin");
		heading = `${t("navigation.auth.login")}`;
	} else if (role === ACTIONS.SUPER_ADMIN) {
		heading = `${t("form.user.superAdmin")} ${t("navigation.auth.login")}`;
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

			<Button
				className={`w-full  min-h-[50px] text-md rounded-full font-probold`}
				disabled={!state.isValid || loading || session?.data?.user?.user_id}
				aria-label="Login to Paiecashplay"
			>
				{loading || session?.data?.user?.user_id ? (
					<Translations text="shared.loading" />
				) : (
					<Translations text="shared.login" />
				)}
			</Button>

			{role !== ACTIONS.SUPER_ADMIN && (
				<div
					className={
						"text-xs text-brand mt-14 flex flex-row  gap-2 justify-center text-center flex-wrap"
					}
				>
					<div className={"flex gap-2 items-center text-center flex-row"}>
						<div className="text-black">
							<Translations text="form.user.newUserSite" />
						</div>
						<Link
							href={`/auth/signup`}
							className={"bg-brandHover text-white py-[2px] px-2 border rounded-full font-probold"}
						>
							<Translations text="shared.signUp" />
						</Link>
					</div>
					<div className={"flex gap-2 items-center text-center flex-row"}>
						<div className="text-black">
							<Translations text="form.password.forgotPassword" />
						</div>
						<Link
							href={role === ACTIONS.ADMIN ? `/auth/reset-password/admin` : `/auth/reset-password`}
							className={"bg-brandHover text-white py-[2px] px-2 border rounded-full font-probold"}
						>
							<Translations text="shared.clickHere" />
						</Link>
					</div>
					<div
						className={
							"flex gap-2 items-center text-center flex-row justify-start md:justify-center "
						}
					>
						<div className="text-black">{loginAs}</div>
						<Link
							href={role === ACTIONS.USER ? `/auth/login/admin` : `/auth/login`}
							className={"bg-brandHover text-white py-[2px] px-2 border rounded-full font-probold"}
						>
							<Translations text="shared.clickHere" />
						</Link>
					</div>
				</div>
			)}
		</form>
	);
};

export default LoginForm;

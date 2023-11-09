"use client";

import { cn } from "@/lib/utils";
import Translations from "../Translations";
import { Input } from "../ui/Input/Input";
import { VALIDATOR_PASSWORDMATCH, VALIDATOR_REQUIRE } from "../ui/Validation/Validator";
import { Button } from "../ui/button";

const ChangePasswordForm = ({
	isLoading,
	formSubmitHandler,
	state,
	InputHandler,
	includeOldPassword,
	className,
}) => {
	return (
		<form className={cn("max-w-2xl mx-auto font-regular", className)} onSubmit={formSubmitHandler}>
			<h1 className="my-5 text-black font-probold  text-4xl">
				<Translations text="form.password.changePassword" />
			</h1>

			{includeOldPassword && (
				<Input
					id="OLD_PASSWORD"
					label={<Translations text="form.password.oldPassword" />}
					placeholder={<Translations text="form.password.enterOldPassword" />}
					errorText={<Translations text="form.password.oldPasswordRequired" />}
					type="password"
					element="input"
					validators={[VALIDATOR_REQUIRE()]}
					onInput={InputHandler}
				/>
			)}

			<Input
				id="PASSWORD"
				label={<Translations text="form.password.newPassword" />}
				placeholder={<Translations text="form.password.enterNewPassword" />}
				errorText={<Translations text="form.password.newPasswordRequired" />}
				type="password"
				element="input"
				validators={[VALIDATOR_REQUIRE()]}
				onInput={InputHandler}
			/>
			<Input
				id="PASSWORD_CONFIRM"
				label={<Translations text="form.password.passwordConfirm" />}
				placeholder={<Translations text="form.password.enterPasswordAgain" />}
				errorText={<Translations text="form.password.passwordMismatch" />}
				type="password"
				element="input"
				validators={[
					VALIDATOR_PASSWORDMATCH(state.inputs.PASSWORD.value, state.inputs.PASSWORD_CONFIRM.value),
				]}
				onInput={InputHandler}
			/>

			<Button
				className={`w-full bg-brand min-h-[50px] text-md rounded-full font-probold`}
				disabled={!state.isValid || isLoading}
				aria-label="Change password"
			>
				{isLoading ? (
					<Translations text="shared.loading" />
				) : (
					<Translations text="form.password.changePassword" />
				)}
			</Button>
		</form>
	);
};

export default ChangePasswordForm;

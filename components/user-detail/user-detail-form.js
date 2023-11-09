"use client";

import { cn } from "@/lib/utils";
import Translations from "../Translations";
import { Input } from "../ui/Input/Input";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../ui/Validation/Validator";
import { Button } from "../ui/button";

const UserDetailForm = ({
	isLoading,
	formSubmitHandler,
	state,
	InputHandler,
	className,
	profileData,
	admin,
}) => {
	return (
		<form className={cn("max-w-2xl mx-auto font-regular", className)} onSubmit={formSubmitHandler}>
			<h1 className="my-5 text-black font-probold  text-4xl">
				{admin ? (
					<Translations text="form.profile.editAdminDetails" />
				) : (
					<Translations text="form.profile.userDetailTitle" />
				)}
			</h1>

			<Input
				id="EMAIL"
				label={<Translations text="form.user.email" />}
				placeholder={<Translations text="form.user.enterEmail" />}
				errorText={<Translations text="form.user.enterValidEmail" />}
				type="text"
				element="input"
				validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
				onInput={InputHandler}
				disabled={true}
				initialValid={true}
				initialValue={profileData?.emailAddress}
			/>
			<Input
				id="FIRSTNAME"
				label={<Translations text="form.profile.firstName" />}
				placeholder={<Translations text="form.profile.enterFirstName" />}
				errorText={<Translations text="form.profile.enterFirstName" />}
				type="text"
				element="input"
				validators={[VALIDATOR_REQUIRE()]}
				onInput={InputHandler}
				initialValid={true}
				initialValue={profileData?.firstName}
			/>

			<Input
				id="LASTNAME"
				label={<Translations text="form.profile.lastName" />}
				placeholder={<Translations text="form.profile.enterlastName" />}
				errorText={<Translations text="form.profile.enterLastName" />}
				type="text"
				element="input"
				validators={[VALIDATOR_REQUIRE()]}
				onInput={InputHandler}
				initialValid={true}
				initialValue={profileData?.lastName}
			/>

			<Button
				className={`w-full bg-brand min-h-[50px] text-md rounded-full font-probold`}
				disabled={!state.isValid || isLoading}
				aria-label="Change user info"
			>
				{isLoading ? <Translations text="shared.loading" /> : <Translations text="shared.save" />}
			</Button>
		</form>
	);
};

export default UserDetailForm;

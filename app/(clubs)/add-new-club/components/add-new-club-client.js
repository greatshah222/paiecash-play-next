"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";

import {
	VALIDATOR_EMAIL,
	VALIDATOR_PASSWORDMATCH,
	VALIDATOR_REQUIRE,
} from "@/components/ui/Validation/Validator";
import { Button } from "@/components/ui/button";
import { useMyContext } from "@/context/StateHolder";
import { useForm } from "@/hooks/form-hook";
import { createNewClub, registerUser } from "@/utils/datahandler";
import { createAdminUserToken } from "@/lib/tokenCreation";
import { ACTIONS } from "@/constants/action";
import { Input } from "@/components/ui/Input/Input";

import Translations from "@/components/Translations";
import useCreateClubModal from "@/hooks/use-create-club-modal";
import InfoAlert from "@/components/info-alert";
import AppConfig from "@/config";

const colorStyles = {
	placeholder: (styles) => ({
		...styles,
		color: "rgb(107 114 128)",
	}),
	control: (styles) => ({
		...styles,
		borderRadius: "9999px", // ROUNDED-MD FORM TAILWIND

		height: "50px",
		minHeight: "50px",
		maxHeight: "50px",
		backgroundColor: "white",
		borderColor: "#00acde",
	}),
};

const AddNewClubClient = ({ clubs }) => {
	const { initialLanguageLoaded } = useMyContext();
	const { t } = useTranslation();
	const router = useRouter();

	const onOpen = useCreateClubModal((state) => state.onOpen);
	const onClose = useCreateClubModal((state) => state.onClose);

	const [loading, setLoading] = useState(false);
	// we need to import UseForm hook and pass the initial inputs and initialFormValidity to userform
	let [state, InputHandler] = useForm(
		{
			CLUB_NAME: {
				CLUB_NAME: "",
				isValid: false,
			},

			CLUB_EMAIL: {
				CLUB_EMAIL: "",
				isValid: false,
			},

			EMAIL: {
				value: "",
				isValid: false,
			},

			PASSWORD: {
				value: "",
				isValid: false,
			},
			PASSWORDCONFIRM: {
				value: "",
				isValid: false,
			},
		},
		false
		// the last false defines if the whole form is valid or not ( since we have set all isvalid to false so our total form validity will also be false)
	);

	const formSubmitHandler = async (e) => {
		try {
			e.preventDefault();
			onOpen();

			setLoading(true);

			onOpen();
			let clubNameFromId = state.inputs?.CLUB_NAME?.value;
			// let clubNameFromId = clubs.find((el) => el?.value === state.inputs?.CLUB_NAME?.value)?.label;

			const res = await createNewClub(
				AppConfig.organization.organizationId,
				clubNameFromId,

				state.inputs?.CLUB_EMAIL?.value,
				AppConfig.organization.key,

				state.inputs?.CLUB_NAME?.value
			);

			if (res?.data?.status === "ok") {
				// we create admin if account creation successfully
				let secret = res?.data?.key;
				let orgId = res?.data?.organizationId;
				let token2 = createAdminUserToken(orgId, secret);

				await registerUser(orgId, state.inputs, ACTIONS.ADMIN, token2);

				toast.success(t("form.club.clubCreated"));
			} else {
				return toast.error(t("form.club.clubError"));
			}
			router.push("/");
		} catch (error) {
			console.log(error);
			return toast.error(t("form.club.clubError"));
		} finally {
			setLoading(false);
			onClose();
		}
	};

	if (!initialLanguageLoaded) return null;

	return (
		<>
			<form className={"max-w-2xl mx-auto font-regular "} onSubmit={formSubmitHandler}>
				<h1 className="my-5 text-brand font-probold  text-4xl">{"Create New Club"}</h1>

				<Input
					id="CLUB_NAME"
					label={<Translations text="form.club.clubName" />}
					placeholder={<Translations text="form.club.clubName" />}
					type="text"
					element={"input"}
					validators={[VALIDATOR_REQUIRE()]}
					errorText={<Translations text="form.club.invalidClubName" />}
					onInput={InputHandler}
				/>

				<Input
					id="CLUB_EMAIL"
					label={<Translations text="form.club.clubEmail" />}
					placeholder={<Translations text="form.user.enterEmail" />}
					type="text"
					element="input"
					validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
					errorText={<Translations text="form.user.enterValidEmail" />}
					onInput={InputHandler}
				/>
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
						VALIDATOR_PASSWORDMATCH(
							state.inputs.PASSWORD.value,
							state.inputs.PASSWORDCONFIRM.value
						),
					]}
					onInput={InputHandler}
				/>

				<Button
					className={`w-full  min-h-[50px] text-md rounded-full font-probold`}
					disabled={!state.isValid || loading}
					aria-label="create new club "
				>
					{loading ? <Translations text="shared.loading" /> : <Translations text="shared.create" />}
				</Button>
			</form>

			<div className="mt-28  max-w-3xl mx-auto">
				<InfoAlert text="form.club.helpText" />
			</div>
		</>
	);
};

export default AddNewClubClient;

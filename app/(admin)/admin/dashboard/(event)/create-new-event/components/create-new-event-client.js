"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import EventForm from "@/components/event-form";
import AppConfig from "@/config";
import { useForm } from "@/hooks/form-hook";
import { addZeroes } from "@/lib/addZeroes";
import { createNewGame, createTicketAccess, updateSingleGame } from "@/utils/createventdatahandler";
import InfoAlert from "@/components/info-alert";
import { removeDateFromString } from "@/lib/removeDateFromString";

const CreateNewEventClient = ({
	torneopalClubId,
	vismaSubmerchantId,
	organizationId,
	eventId,
	token,
	data,
	games,
	isSuperAdmin,
	...props
}) => {
	const { t } = useTranslation();
	const router = useRouter();
	const isTorneopalIdPresent = !!torneopalClubId;

	console.log("props", props);
	console.log(
		torneopalClubId,
		vismaSubmerchantId,
		organizationId,
		eventId,
		token,
		data,
		games,
		isSuperAdmin
	);

	const [isLoading, setIsLoading] = useState(false);

	const [state, InputHandler] = useForm(
		{
			GAME_NAME: {
				value: "",
				isValid: false,
			},

			GAME: {
				value: "",
				isValid: false,
			},

			// GAME TYPE BASICALLY MEANS WHETHER IT IS PRACTISE OR FROM SERIES
			GAME_TYPE: {
				value: "",
				isValid: false,
			},

			// OPPONENT IS BASICALLY GETTING GAMES BASED ON TEAM ID ->TEAM ID IS SELECTED AFTER GETTING CLUB-ID FROM CLUB_NAME PARAMS
			OPPONENT: {
				value: "",
				isValid: false,
			},
			HOME_TEAM_LOGO_URL: {
				value: "",
				isValid: true,
			},
			AWAY_TEAM_LOGO_URL: {
				value: "",
				isValid: true,
			},
			TEAM_NAME: {
				value: "",
				isValid: false,
			},
			TOURNAMENT_NAME: {
				value: "",
				isValid: true,
			},
			DESCRIPTION: {
				value: "",
				isValid: false,
			},
			START_TIME: {
				value: "",
				isValid: true,
			},
			DURATION: {
				value: "",
				isValid: true,
			},

			TICKET: {
				value: "",
				isValid: false,
			},

			TICKET_QUANTITY: {
				value: 1,
				isValid: true,
			},
		},
		false
		// the last false defines if the whole form is valid or not ( since we have set all isvalid to false so our total form validity will also be false)
	);
	const durationDefaultValues = [
		{ value: 1, label: `30 ${t("addnewgame.minutes")}`, valueInMinutes: 30 },
		{ value: 2, label: `45 ${t("addnewgame.minutes")}`, valueInMinutes: 45 },
		{ value: 3, label: `1 ${t("addnewgame.hour")}`, valueInMinutes: 60 },
		{
			value: 4,
			label: `1 ${t("addnewgame.hour")} 30 ${t("addnewgame.minutes")}`,
			valueInMinutes: 90,
		},
		{ value: 5, label: `2 ${t("addnewgame.hours")}`, valueInMinutes: 120 },
		{
			value: 6,
			label: `2 ${t("addnewgame.hours")} 30 ${t("addnewgame.minutes")}`,
			valueInMinutes: 150,
		},
		{ value: 7, label: `3 ${t("addnewgame.hours")}`, valueInMinutes: 180 },
	];
	const ticketDefaultValues = [
		{ value: "free", label: `${t("addnewgame.free")}`, price: 0 },
		{ value: "lite", label: `${t("addnewgame.lite")}`, price: 3.9 },
		{ value: "lite+", label: `${t("addnewgame.lite+")}`, price: 4.9 },
		{ value: "normal", label: `${t("addnewgame.normal")}`, price: 5.9 },
		{ value: "normal2", label: `${t("addnewgame.normal2")}`, price: 6.9 },
		{ value: "premium", label: `${t("addnewgame.premium")}`, price: 8.9 },
	];

	const getTicketPrice = (value) => {
		return ticketDefaultValues.filter((ticket) => ticket.value === value)[0].price;
	};
	const onSubmitHandler = async (e) => {
		e.preventDefault();

		let durationInMinutes = durationDefaultValues.find(
			(el) => el.value === state.inputs.DURATION.value
		)?.valueInMinutes;

		let durPublic = durationInMinutes * 60;
		let dur = durPublic + 10 * 60; // 10 minutes extra for the time prior to public start time

		let selectedGame;

		if (state.inputs.GAME_TYPE.value === "s_game" && state.inputs.GAME.value * 1 > 0) {
			// THIS MEANS IT IS A SEASON GAME

			selectedGame = games?.find((el) => el?.value * 1 === state.inputs.GAME.value * 1)?.game;
		} else if (
			state.inputs.GAME_TYPE.value === "s_game" &&
			isTorneopalIdPresent &&
			eventId &&
			data
		) {
			// this is edit mode and we have to find the game
			selectedGame = games?.find((el) => el?.value * 1 === data?.externalId * 1)?.game;
		}

		let event = {
			name: {
				en_US: state.inputs.GAME_NAME.value,
			},
			description: {
				en_US: state.inputs.DESCRIPTION.value,
			},
			defaultLanguage: "en_US", // dont now if we need to ask user for these
			startTimePublic: state.inputs.START_TIME.value.getTime(),
			startTime: state.inputs.START_TIME.value.getTime() - 10 * 60 * 1000, // 10 minutes prior to public start time
			durationPublic: durPublic,
			duration: dur,
			homeTeamName: state.inputs.TEAM_NAME.value,
			awayTeamName: state.inputs.OPPONENT.value,
			isOfficial: state.inputs.GAME_TYPE.value === "s_game" ? true : false, // true if season game
			externalId: selectedGame?.match_id,

			seasonId: "2023-2024", // pass as full 2023-2024
			seasonName: "2023-2024",

			areaId: selectedGame?.competition_id,

			areaAbbr: removeDateFromString(selectedGame?.competition_name), // WE HAVE TO REMOVE 2023-2024 FROM THIS STRING

			// CUSTOM TOURNAMENT STARTS HERE

			homeTeamLogoUrl: state.inputs.HOME_TEAM_LOGO_URL.value,
			awayTeamLogoUrl: state.inputs.AWAY_TEAM_LOGO_URL.value,
			isTournamentGame: state.inputs.GAME_TYPE.value === "t_game" && true,

			// CUSTOM TOURNAMENT ENDS HERE

			homeTeamId: selectedGame?.team_A_id || "",
			awayTeamId: selectedGame?.team_B_id || "",

			homeClubId: selectedGame?.club_A_id,
			awayClubId: selectedGame?.club_B_id,

			// if tournament game we will save name given by user

			seriesId: selectedGame?.competition_id,

			seriesName:
				state.inputs.GAME_TYPE.value === "t_game"
					? state.inputs.TOURNAMENT_NAME?.value
						? state.inputs.TOURNAMENT_NAME?.value
						: "Maajoukkueet"
					: isTorneopalIdPresent
					? removeDateFromString(selectedGame?.competition_name)
					: "Maajoukkueet",

			// we are passing random levelId and thinking it will not match with any levelid from nodeon
			levelId: isTorneopalIdPresent ? selectedGame?.category_id : "122345678901234567890",

			levelName: isTorneopalIdPresent ? selectedGame?.category_name : "Maajoukkueet",

			clubId: torneopalClubId, // this is not expected by suite rn but we might need this in future,

			// no idea about the below list starts here
			publishingRecording: true,
			recordingDownloadable: false,
			displayScores: false,

			channelQuality: state.inputs.TICKET.value !== "free" ? 1080 : 720, // PAID GAMES WILL HAVE 1080 POOL WHERAS FREE GAMES HAS 720P
		};

		// "category_id": "444", (divari), so games in this category should be added to that divari package // 401 is naisten divari
		let packageId = 0;

		let shouldGameBeInPackage = !!(
			selectedGame?.category_id * 1 === 444 || selectedGame?.category_id * 1 === 401
		);

		if (shouldGameBeInPackage) {
			packageId =
				selectedGame?.category_id * 1 === 444
					? AppConfig.packages.inssiDivari.packageId
					: AppConfig.packages.naistenDivari.packageId;
		}
		let newEvent = {
			game: event,
			organizationId,

			packageId,
		};

		if (eventId) {
			newEvent.gameId = eventId;
			// this means we are updating
		}

		try {
			let res;

			if (eventId) {
				res = await updateSingleGame(newEvent, token);
			} else {
				res = await createNewGame(newEvent, token);
			}

			if (res?.data?.status === "ok") {
				if (!eventId) {
					if (state.inputs.TICKET.value !== "free") {
						let ticketObject = {
							organizationId,
							// always pass gameId cause they dont work properly with eventId for now
							gameId: res?.data?.game?.gameId,
							accessControl: {
								accessControlType: 6,
								accessControlData: {
									price: addZeroes(getTicketPrice(state.inputs.TICKET.value)),
									tax: 10,
									validity: 1000,
									maximumQuantity: Math.round(state.inputs.TICKET_QUANTITY.value),
									availableTo: state.inputs.START_TIME.value.getTime() + 30 * 24 * 60 * 60 * 1000,
								},
							},
						};
						try {
							const res11 = await createTicketAccess(ticketObject, token);
						} catch (error) {}
					}
				}

				toast.success(eventId ? t("addnewgame.editedSuccess") : t("addnewgame.createSuccess"));
				router.refresh();
				router.push(
					`/admin/dashboard/event/${res?.data?.game?.organizationId}/${res?.data?.game?.gameId}`
				);
			} else {
				setIsLoading(false);

				if (
					res?.response?.status === 400 &&
					res?.response?.data?.message === "no-channels-available"
				) {
					return toast.error(t("addnewgame.noFreeChannels"));
				} else if (
					res?.response?.status === 400 &&
					res?.response?.data?.errors?.externalId?.length
				) {
					return toast.error(t("addnewgame.gameAlreadyExists"));
				} else {
					return toast.error(t("shared.errorGeneric"));
				}
			}
		} catch (error) {
			return toast.error(t("shared.errorGeneric"));
		}
	};
	return (
		<>
			<div className="form-primary mx-auto my-10">
				<InfoAlert text={"addnewgame.newGameInfo"} />
			</div>
			<div className="form-primary mx-auto">
				<EventForm
					vismaSubmerchantId={vismaSubmerchantId}
					isLoading={isLoading}
					state={state}
					InputHandler={InputHandler}
					onSubmitHandler={onSubmitHandler}
					data={data}
					durationDefaultValues={durationDefaultValues}
					ticketDefaultValues={ticketDefaultValues}
					games={games}
					torneopalClubId={torneopalClubId}
					isSuperAdmin={isSuperAdmin}
				/>
			</div>
		</>
	);
};

export default CreateNewEventClient;

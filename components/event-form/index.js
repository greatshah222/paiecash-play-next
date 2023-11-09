"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "../ui/Input/Input";
import { VALIDATOR_NONE, VALIDATOR_REQUIRE } from "../ui/Validation/Validator";
import { Button } from "../ui/button";
import Translations from "../Translations";
import { changeGameTimeToUnix } from "@/lib/changeGameTimeToUnix";

const EventForm = ({
	torneopalClubId,
	data,
	vismaSubmerchantId,
	isLoading,
	state,
	InputHandler,
	onSubmitHandler,
	durationDefaultValues,
	ticketDefaultValues,
	games,
	isSuperAdmin,
}) => {
	const { t } = useTranslation();

	// THIS IS STARTTIME IN CASE OF SEASON GAME AND USER CANNOT CHANGE IT
	const [gameStartTime, setGameStartTime] = useState(null);
	// getting event duration on edit page
	const [editGameDurationValue, seteditGameDurationValue] = useState(null);
	const [loading, setLoading] = useState(false);
	const [editGame, setEditGame] = useState(null);

	const [seasonGame, setSeasonGame] = useState(null);

	const [isSeasonGameLoading, setIsSeasonGameLoading] = useState(false);

	const [isEditGameLoading, setIsEditGameLoading] = useState(false);

	const isTorneopalIdPresent = !!torneopalClubId;
	const GAME_TYPE_LIST = [
		{ value: "p_game", label: `${t("addnewgame.practiseGame")}` },
		{ value: "s_game", label: `${t("addnewgame.seasonGame")}` },
	];

	if (!isTorneopalIdPresent || isSuperAdmin) {
		// for now this will just be for maajoukeet who will create any tournament games and this will be a flag to add any home and away team URL
		GAME_TYPE_LIST.push({
			value: "t_game",
			label: `${t("addnewgame.tournament")}`,
		});
	}

	const getTicketValue = (event) => {
		return getTicket(event)[0]?.value;
	};

	const getTicketLabel = (event) => {
		if (!event) return;

		return getTicket(event)[0]?.label;
	};

	const getTicket = (event) => {
		let price = typeof event === "number" ? 0 : event?.accessControls[0].accessControlData.price;
		return ticketDefaultValues.filter((ticket) => ticket.price === price);
	};

	useEffect(() => {
		if (state?.inputs?.GAME?.value && state?.inputs?.GAME_TYPE.value === "s_game") {
			setIsSeasonGameLoading(true);

			let currentSeasonGame;

			if (data) {
				// THIS MEANS THIS IS EDIT MODE AND WE ALREADY HAVE GAME HERE

				setIsEditGameLoading(true);

				setEditGame(games?.find((el) => el?.value * 1 === data?.externalId * 1));

				setTimeout(() => {
					setIsEditGameLoading(false);
				}, 10);
			} else {
				currentSeasonGame = games?.find((el) => el?.value === state?.inputs?.GAME?.value)?.game;
				setSeasonGame(currentSeasonGame);
			}

			setGameStartTime(changeGameTimeToUnix(currentSeasonGame?.time, currentSeasonGame?.date));

			setTimeout(() => {
				setIsSeasonGameLoading(false);
			}, 10);
		}
	}, [data, games, state?.inputs?.GAME?.value, state?.inputs?.GAME_TYPE.value]);

	useEffect(() => {
		if (data?.event) {
			setLoading(true);
			let currentEventDuration = data?.event?.durationPublic / 60;
			currentEventDuration = durationDefaultValues.find(
				(el) => el?.valueInMinutes === currentEventDuration
			);
			seteditGameDurationValue(currentEventDuration);
			setTimeout(() => {
				setLoading(false);
			}, 10);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.event, seteditGameDurationValue]);

	useEffect(() => {
		if (state?.inputs?.GAME_TYPE?.value !== "s_game" || !isTorneopalIdPresent) {
			setIsSeasonGameLoading(true);
			state.inputs.GAME.isValid = true;
			setTimeout(() => {
				setIsSeasonGameLoading(false);
			}, 10);
		}
	}, [state.inputs.GAME, state.inputs?.GAME_TYPE, isTorneopalIdPresent]);

	let heading;
	if (data?.event) {
		heading = t("addnewgame.editGame");
	} else {
		heading = t("addnewgame.createNewGame");
	}

	if (loading) return null;

	return (
		<form className="p-10 flex flex-col gap-y-3 mb-24" onSubmit={onSubmitHandler}>
			<h1 className="my-5 text-brand font-probold  text-4xl">{heading}</h1>
			<Input
				id="GAME_TYPE"
				type="text"
				element="select_dropdown"
				validators={[VALIDATOR_REQUIRE()]}
				label={t("addnewgame.gameType")}
				placeholder={t("addnewgame.gameType")}
				errorText={t("addnewgame.invalidGameType")}
				onInput={InputHandler}
				selectData={GAME_TYPE_LIST}
				// first check whether it is tounament game or not
				defaultValue={{
					label:
						(data?.isTournamentGame && t("addnewgame.tournament")) ||
						(data?.isOfficial && `${t("addnewgame.seasonGame")}`) ||
						(data && !data?.isOfficial && `${t("addnewgame.practiseGame")}`) ||
						"",
					value: data?.homeTeamId || "",
				}}
				initialValue={
					(data?.isTournamentGame && "t_game") ||
					(data?.isOfficial && "s_game") ||
					(data && !data?.isOfficial && "p_game") ||
					""
				}
				initialValid={
					data?.isTournamentGame || data?.isOfficial || (data && !data.isOfficial) ? true : false
				}
				disabled={typeof data?.isOfficial === "undefined" ? false : true}
			/>
			{state?.inputs?.GAME_TYPE.value === "s_game" &&
				isTorneopalIdPresent &&
				(isEditGameLoading ? (
					<></>
				) : (
					<Input
						id="GAME"
						type="text"
						element={"select_dropdown"}
						validators={[VALIDATOR_REQUIRE()]}
						label={t("addnewgame.selectGame")}
						errorText={t("addnewgame.selectGame")}
						onInput={InputHandler}
						labelInfo={t("addnewgame.seriesGameInfo")}
						selectData={games}
						defaultValue={{
							label: editGame?.label || data?.homeTeamName || "",
							value: editGame?.value || data?.homeTeamId || "",
						}}
						initialValue={
							isTorneopalIdPresent
								? data
									? `${editGame?.match_id}` // FOR ORG WITH TORNEO CLUB ID
									: data?.homeTeamId // FOR ORG WITH NO TORNEO CLUB ID
								: data?.homeTeamName
						}
						initialValid={data ? true : false}
						disabled={state.inputs.GAME_TYPE.value === "s_game" && data} // edit mode disabled
					/>
				))}
			{isSeasonGameLoading ? (
				<>Some loader</>
			) : (
				<Input
					id="TEAM_NAME"
					type="text"
					element={"input"}
					validators={[VALIDATOR_REQUIRE()]}
					label={t("addnewgame.teamName")}
					placeholder={t("addnewgame.teamName")}
					errorText={t("addnewgame.invalidTeamName")}
					onInput={InputHandler}
					initialValue={
						seasonGame?.team_A_name
							? seasonGame?.team_A_name
							: data?.homeTeamName
							? data?.homeTeamName
							: ""
					}
					initialValid={
						seasonGame?.team_A_name || data?.homeTeamName || data?.homeTeamId ? true : false
					}
				/>
			)}
			{isSeasonGameLoading ? (
				<>Some loader</>
			) : (
				<Input
					id="OPPONENT"
					type="text"
					element={"input"}
					validators={[VALIDATOR_REQUIRE()]}
					errorText={t("addnewgame.invalidOpponent")}
					label={t("addnewgame.opponent")}
					placeholder={t("addnewgame.opponent")}
					onInput={InputHandler}
					initialValue={
						seasonGame?.team_B_name
							? seasonGame?.team_B_name
							: data?.awayTeamName
							? data?.awayTeamName
							: ""
					}
					initialValid={
						seasonGame?.team_B_name || data?.awayTeamName || data?.awayTeamId ? true : false
					}
				/>
			)}
			{(state?.inputs?.GAME_TYPE.value === "t_game" || data?.isTournamentGame) && (
				<>
					<Input
						id="TOURNAMENT_NAME"
						type="text"
						element={"input"}
						validators={[VALIDATOR_NONE()]}
						placeholder={t("addnewgame.tournamentName")}
						label={t("addnewgame.tournamentName")}
						onInput={InputHandler}
						initialValue={data?.seriesName && data?.seriesName}
						initialValid={true}
					/>

					{/* // NOT ALLOWING THIS FOR NOW */}

					{/* <Input
						id="HOME_TEAM_LOGO_URL"
						type="text"
						element={"input"}
						validators={[VALIDATOR_NONE()]}
						placeholder={t("addnewgame.homeTeamLogoURL")}
						label={t("addnewgame.homeTeamLogoURL")}
						infoLabel={`${t("addnewgame.logoUrlFormat")}} https://salibandy.tv/static/media/
						logo_organization.6cabeca1.png`}
						onInput={InputHandler}
						initialValue={data?.homeTeamLogoUrl && data?.homeTeamLogoUrl}
						initialValid={true}
					/>
					<Input
						id="AWAY_TEAM_LOGO_URL"
						type="text"
						element={"input"}
						validators={[VALIDATOR_NONE()]}
						placeholder={t("addnewgame.awayTeamLogoURL")}
						label={t("addnewgame.awayTeamLogoURL")}
						infoLabel={`${t("addnewgame.logoUrlFormat")}} https://salibandy.tv/static/media/
						logo_organization.6cabeca1.png`}
						onInput={InputHandler}
						initialValue={data?.awayTeamLogoUrl && data?.awayTeamLogoUrl}
						initialValid={true}
					/> */}
				</>
			)}
			{isSeasonGameLoading ? (
				<>Some type of loader</>
			) : (
				<Input
					id="START_TIME"
					type="date_time"
					element="input"
					validators={[VALIDATOR_REQUIRE()]}
					label={t("addnewgame.startTime")}
					labelInfo={data?.event && t("addnewgame.editStartTimeInfo")}
					errorText={t("addnewgame.invalidstartTime")}
					onInput={InputHandler}
					required={true}
					// NOTE: You cannot currently edit start times or duration of an existing event! If the start times need to be changed, you must first delete the existing event and then create a new one with the new times.
					disabled={
						!state?.inputs?.GAME_TYPE.value ||
						(state?.inputs?.GAME_TYPE.value === "s_game" && isTorneopalIdPresent) ||
						data?.event?.duration
					}
					initialValue={
						(gameStartTime && new Date(gameStartTime)) ||
						(data?.startTime && new Date(data?.startTime))
					}
					initialValid={
						(gameStartTime && new Date(gameStartTime)) ||
						(data?.startTime && new Date(data?.startTime))
							? true
							: false
					}
				/>
			)}
			{isSeasonGameLoading ? (
				<></>
			) : (
				<Input
					id="GAME_NAME"
					label={t("addnewgame.gameName")}
					errorText={t("addnewgame.invalidGameName")}
					type="text"
					element="input"
					validators={[VALIDATOR_REQUIRE()]}
					onInput={InputHandler}
					// initialValue={data ? data?.event?.name[data?.event?.eventLanguages] : ""}
					// initialValid={data?.event?.name[data?.event?.eventLanguages] ? true : false}

					initialValue={
						seasonGame?.team_A_name
							? `${seasonGame?.team_A_name}- ${seasonGame?.team_B_name}`
							: data
							? data?.event?.name[data?.event?.eventLanguages]
							: ""
					}
					initialValid={
						seasonGame?.team_A_name || data?.event?.name[data?.event?.eventLanguages] ? true : false
					}
				/>
			)}
			<Input
				id="DESCRIPTION"
				type="text"
				element="textarea"
				validators={[VALIDATOR_REQUIRE()]}
				label={t("addnewgame.description")}
				errorText={t("addnewgame.invalidDescription")}
				onInput={InputHandler}
				initialValue={data ? data?.event?.description[data?.event?.eventLanguages] : ""}
				initialValid={data?.event?.description[data?.event?.eventLanguages] ? true : false}
			/>
			<Input
				id="DURATION"
				placeholder={t("addnewgame.duration")}
				element="select_dropdown"
				validators={[VALIDATOR_REQUIRE()]}
				label={t("addnewgame.duration")}
				labelInfo={t("addnewgame.durationInfo")}
				errorText={t("addnewgame.invalidduration")}
				onInput={InputHandler}
				required={true}
				selectData={durationDefaultValues}
				defaultValue={{
					label:
						data?.event && editGameDurationValue
							? editGameDurationValue?.label
							: `2 ${t("addnewgame.hours")}`,
					value: data?.event && editGameDurationValue ? editGameDurationValue?.value : 5,
				}}
				disabled={typeof data?.event === "undefined" ? false : true}
				initialValue={data && editGameDurationValue ? editGameDurationValue?.value : 5}
				// initial valid is true cause we have selected 2 hours as default value
				initialValid={true}
			/>
			<Input
				id="TICKET"
				label={t("addnewgame.ticketRequired")}
				labelInfo={data?.event && t("addnewgame.ticketInfo")}
				placeholder={t("addnewgame.ticketRequired")}
				type="text"
				element="select_dropdown"
				validators={[VALIDATOR_REQUIRE()]}
				errorText={t("addNewGame.invalidPrice")}
				onInput={InputHandler}
				selectData={vismaSubmerchantId ? ticketDefaultValues : ticketDefaultValues.slice(0, 1)}
				defaultValue={{
					label: data?.event
						? data?.event?.accessControls[0]?.typeId === 6
							? getTicketLabel(data.event)
							: ticketDefaultValues[0]?.label
						: "",
					value: data?.event
						? data?.event?.accessControls[0]?.typeId === 6
							? getTicketValue(data.event)
							: ticketDefaultValues[0]?.value
						: "",
				}}
				initialValid={data?.event ? true : false}
				initialValue={
					data?.event?.accessControls[0]?.typeId === 6 ? getTicketValue(data.event) : ""
				}
				disabled={typeof data?.event === "undefined" ? false : true}
			/>{" "}
			<Button size="lg" className="w-full" disabled={isLoading || !state.isValid}>
				{data ? <Translations text="shared.save" /> : <Translations text="shared.create" />}
			</Button>
		</form>
	);
};

export default EventForm;

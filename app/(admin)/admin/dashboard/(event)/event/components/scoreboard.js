"use client";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

import { scoreBoardHandler } from "@/utils/datahandler";

import ScoreboardItem from "./scoreboard-item";

let USE_UPDATED_API_ENDPOINT = true;

const Scoreboard = ({ serviceId, token, currentStreamScoreboardParams, event }) => {
	const { t } = useTranslation();
	const scoreBoardStatus = useRef();
	const [cookies, setCookie] = useCookies("");

	const [clockRunning, setClockRunning] = useState(false);

	const [scoreTeamA, setScoreTeamA] = useState(0);
	const [scoreTeamB, setScoreTeamB] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);

	const [gamePeriod, setGamePeriod] = useState(0);

	const [updateScore, setUpdateScore] = useState(null);
	const [updatePeriod, setUpdatePeriod] = useState(null);

	const [scoreLoading, setScoreLoading] = useState(false);

	const [showScore, setshowScore] = useState(true);
	const [showPeriod, setShowPeriod] = useState(true);
	const [showScoreboard, setShowScoreboard] = useState(true);
	const bottomCTA = [
		{
			title: clockRunning ? t("scoreboard.stop") : t("scoreboard.start"),
			onClick: async (title) => {
				let curStatus = clockRunning;
				scoreBoardStatus.current = curStatus ? "stop" : "start";
				setClockRunning((prev) => !prev);

				const data = {
					// START/STOP/RESET

					// we will just start or stop the clock

					timerStatus: title === t("scoreboard.start") ? "START" : "STOP",
					streamName: serviceId,
				};
				let totalSecond;
				if (!clockRunning) {
					// here user might update time as well so we have to pass time also ->only when user press start button
					totalSecond = (minutes * 60 + seconds * 1) * 1000;
					data.time = totalSecond;
				}

				await scoreBoardHandler(data, token, USE_UPDATED_API_ENDPOINT);
			},
			variant: clockRunning ? "destructive" : "outline",
		},

		{
			title: t("scoreboard.update"),
			disabled: clockRunning,
			onClick: async () => {
				setClockRunning(true);

				let totalSecond = (minutes * 60 + seconds * 1) * 1000;

				const data = {
					// WE WILL START THE CLOCK WHEN USER PRESSES UPDATE BUTTON
					timerStatus: "START",
					streamName: serviceId,
					time: totalSecond,
					// here we have to pass the time and time is millisecond
				};
				scoreBoardStatus.current = "start";
				// since minutes and seconds will not update when calling localCookie fucntion we are passing it from here
				await scoreBoardHandler(data, token, USE_UPDATED_API_ENDPOINT);
			},
			variant: "outline",
		},
	];

	useEffect(() => {
		if (currentStreamScoreboardParams?.serviceId) {
			if (currentStreamScoreboardParams?.wowzaResponse?.scoreboardStatus?.timerStatus === "START") {
				setClockRunning(true);

				let curTime =
					Date.now() -
					currentStreamScoreboardParams?.wowzaResponse?.scoreboardStatus?.timerStart * 1;

				let minutesLocal = Math.floor(curTime / 60000);

				let secondsLocal = ((curTime % 60000) / 1000).toFixed(0);

				setMinutes(minutesLocal * 1);
				setSeconds(secondsLocal * 1);
			} else {
				// timer is stopeed
				setClockRunning(false);

				if (currentStreamScoreboardParams?.wowzaResponse?.scoreboardStatus?.timerStart) {
					let curTime =
						currentStreamScoreboardParams?.wowzaResponse?.scoreboardStatus?.prevTimer * 1;

					let minutesLocal = Math.floor(curTime / 60000);

					let secondsLocal = ((curTime % 60000) / 1000).toFixed(0);

					setMinutes(minutesLocal * 1);
					setSeconds(secondsLocal * 1);
				}
			}

			// scores
			if (currentStreamScoreboardParams?.wowzaResponse.scoreboardStatus?.scoreLeft) {
				setScoreTeamA(
					currentStreamScoreboardParams?.wowzaResponse?.scoreboardStatus?.scoreLeft * 1
				);
			}
			if (currentStreamScoreboardParams?.wowzaResponse.scoreboardStatus?.scoreRight) {
				setScoreTeamB(
					currentStreamScoreboardParams?.wowzaResponse?.scoreboardStatus?.scoreRight * 1
				);
			}
			// period

			if (currentStreamScoreboardParams?.wowzaResponse.scoreboardStatus?.period) {
				let curPer = currentStreamScoreboardParams?.wowzaResponse.scoreboardStatus?.period;

				setGamePeriod(curPer * 1);

				setScoreTeamB(
					currentStreamScoreboardParams?.wowzaResponse?.scoreboardStatus?.scoreRight * 1
				);
			}

			// show or hide period
			if (currentStreamScoreboardParams?.wowzaResponse.scoreboardStatus?.period) {
				setShowPeriod(true);
			} else {
				setShowPeriod(false);
			}
		}
	}, [
		currentStreamScoreboardParams?.serviceId,
		currentStreamScoreboardParams?.wowzaResponse.scoreboardStatus?.period,
		currentStreamScoreboardParams?.wowzaResponse.scoreboardStatus?.prevTimer,
		currentStreamScoreboardParams?.wowzaResponse.scoreboardStatus?.scoreLeft,
		currentStreamScoreboardParams?.wowzaResponse.scoreboardStatus?.scoreRight,
		currentStreamScoreboardParams?.wowzaResponse.scoreboardStatus?.timerStart,
		currentStreamScoreboardParams?.wowzaResponse.scoreboardStatus?.timerStatus,
	]);
	useEffect(() => {
		// we update request every 1.5 s after user changes score
		const delayDebounceFn = setTimeout(async () => {
			if (updateScore?.streamName) {
				await scoreBoardHandler(updateScore, token, USE_UPDATED_API_ENDPOINT);
				setUpdateScore(null);
				setScoreLoading(false);
			}
		}, 1000);

		return () => clearTimeout(delayDebounceFn);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateScore]);

	useEffect(() => {
		// we update request every 1.5 s after user changes score
		const delayDebounceFn = setTimeout(async () => {
			if (updatePeriod?.streamName) {
				// if we send any period to backend ->it auto shows the period even ifit was hidden
				setShowPeriod(true);
				await scoreBoardHandler(updatePeriod, token, USE_UPDATED_API_ENDPOINT);
				setUpdatePeriod(null);
			}
		}, 1000);

		return () => clearTimeout(delayDebounceFn);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updatePeriod]);

	// to change team score

	const teamScoreHandler = async (val, type) => {
		let data = {
			streamName: serviceId,
		};

		if (type === "home") {
			data.scoreLeft = val;
			setScoreTeamA(val);
		} else {
			data.scoreRight = val;
			setScoreTeamB(val);
		}
		setUpdateScore(data);
		setScoreLoading(true);
	};

	// to change value of period

	const periodChangeHandler = (val) => {
		setGamePeriod(val);
		let data = {
			streamName: serviceId,
		};

		data.period = val * 1;
		setUpdatePeriod(data);
	};

	const changeSwitchCookieVal = (type, val) => {
		let cookieData = cookies?.scbSwitch || {};

		cookieData[type] = val ? "show" : "hide";
		setCookie("scbSwitch", cookieData, {
			path: "/",
		});
	};
	// to show period or not

	const showPeriodHandler = async (val) => {
		setShowPeriod(val);

		changeSwitchCookieVal("showPeriod", val);

		/* 
         To hide period you should send an empty value :

        curl -d '{"streamName":"score","period":""}'  [http://[wowza_IP]:8086/overlay]http://[wowza_IP]:8086/overlay 
        
        */

		let curGamePeiod;
		if (!val) {
			curGamePeiod = "";
		} else {
			curGamePeiod = (cookies?.scb?.period ? cookies?.scb?.period : gamePeriod) * 1;
			if (curGamePeiod * 1 <= 3) {
				// normal time period
				curGamePeiod = `P${curGamePeiod}`;
			} else {
				// extra time period
				// 1-3 cause p4 is acutal E1
				curGamePeiod = `E${curGamePeiod - 3}`;
			}
		}
		const data = {
			streamName: serviceId,
			period: curGamePeiod,
		};

		// this uses scoreboard api not overlay api

		await scoreBoardHandler(data, token, USE_UPDATED_API_ENDPOINT);
	};

	// to show both teams scores or not
	const showScoreHandler = async (val) => {
		setshowScore(val);

		changeSwitchCookieVal("showScore", val);
		const data = {
			streamName: serviceId,
			scoreboardShowScore: val ? true : false,
		};

		await scoreBoardHandler(data, token);
	};

	// to show scoreboard or not ->to hide send value as empty string

	const showScoreBoardHandler = async (val) => {
		setShowScoreboard(val);

		changeSwitchCookieVal("showScoreBoard", val);

		const data = {
			streamName: serviceId,
			scoreboardImage: val ? "scoreboard.png" : "",
		};

		await scoreBoardHandler(data, token);
	};

	return (
		<ScoreboardItem
			bottomCTA={bottomCTA}
			clockRunning={clockRunning}
			scoreTeamB={scoreTeamB}
			scoreTeamA={scoreTeamA}
			teamScoreHandler={teamScoreHandler}
			seconds={seconds}
			setSeconds={setSeconds}
			minutes={minutes}
			setMinutes={setMinutes}
			gamePeriod={gamePeriod}
			periodChangeHandler={periodChangeHandler}
			showPeriod={showPeriod}
			showScoreboard={showScoreboard}
			showScore={showScore}
			showPeriodHandler={showPeriodHandler}
			showScoreHandler={showScoreHandler}
			showScoreBoardHandler={showScoreBoardHandler}
			homeTeamName={event?.homeTeamName}
			awayTeamName={event?.awayTeamName}
			scoreLoading={scoreLoading}
		/>
	);
};

export default Scoreboard;

import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { useCallback } from "react";

import ScoreBoardInput from "@/components/scoreboard/ScoreBoardInput";
import SwitchCheckBox from "@/components/scoreboard/SwitchCheckBox";
import { Button } from "@/components/ui/button";
import Translations from "@/components/Translations";

import classes from "@/app/styles/scoreboard.module.css";

let timerId;
let SECOND, MINUTE;

const ScoreboardItem = ({
	bottomCTA,

	clockRunning,
	scoreTeamB,
	scoreTeamA,
	teamScoreHandler,
	seconds,
	setSeconds,
	minutes,
	setMinutes,
	gamePeriod,

	periodChangeHandler,
	showPeriod,
	showScoreboard,
	showPeriodHandler,
	showScoreBoardHandler,
	showScore,
	showScoreHandler,
	homeTeamName,
	awayTeamName,
	scoreLoading,
}) => {
	const { t } = useTranslation();

	const refreshClock = useCallback(() => {
		// we also assume minutes will not go more than 59 minutes
		SECOND++;

		if (SECOND * 1 > 59) {
			setMinutes((prev) => prev * 1 + 1);
			MINUTE++;

			setSeconds(0);
			SECOND = 0;
		} else {
			setSeconds((prev) => prev * 1 + 1);
		}
	}, [setMinutes, setSeconds]);

	const startTimer = useCallback(() => {
		timerId = setInterval(refreshClock, 1000);
	}, [refreshClock]);

	const endTimer = () => {
		clearInterval(timerId);
	};

	useEffect(() => {
		return () => {
			clearInterval(timerId);
		};
	}, []);

	const setTeamScoreHandler = (val, type) => {
		teamScoreHandler(val, type);
	};

	const minuteChangeHandler = (e) => {
		setMinutes(e?.target.value * 1);
		MINUTE = e?.target.value * 1;
	};
	const secondChangeHandler = (e) => {
		setSeconds(e?.target.value * 1);
		SECOND = e?.target.value * 1;
	};

	useEffect(() => {
		if (clockRunning) {
			startTimer();
		}
	}, [clockRunning, startTimer]);

	useEffect(() => {
		MINUTE = minutes * 1;
		SECOND = seconds * 1;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={`${classes.ScoreboardItem} text-md regular bg-primary/90`}>
			<div className="text-xs">
				<Translations text="scoreboard.scoreboardItem.info" />
			</div>
			<div className={classes["scoreboard-time"]}>
				<div style={{ paddingTop: "20px" }} className="text-2xl">
					{t("scoreboard.clockIs")}{" "}
					{clockRunning ? t("scoreboard.running") : t("scoreboard.stopped")}
				</div>
				<div className={classes["scoreboard-time-container"]}>
					<ScoreBoardInput
						label={t("scoreboard.minute")}
						id={"Minute"}
						value={minutes}
						disabled={clockRunning}
						min={0}
						changeHandler={(e) => {
							minuteChangeHandler(e);
						}}
						inputClassName="scoreboard-time-container"
					/>
					<ScoreBoardInput
						label={t("scoreboard.second")}
						id={"Second"}
						value={seconds}
						disabled={clockRunning}
						min={0}
						changeHandler={(e) => {
							secondChangeHandler(e);
						}}
						inputClassName="scoreboard-time-container"
					/>

					<div className={classes.bottomCTA}>
						{bottomCTA.map((el) => (
							<Button
								variant={el?.variant}
								disabled={el?.disabled}
								className={el?.variant === "outline" && "text-white"}
								key={el?.title}
								onClick={() => {
									endTimer();

									el.onClick(el.title);
								}}
							>
								{el.title}
							</Button>
						))}
					</div>
				</div>
			</div>

			<div className={classes["scoreboard-item--topcta"]}>
				<div className={classes["scoreboard-item--topcta_items"]}>
					<div className={classes["scoreboard-item--topcta_items_score"]}>
						<ScoreBoardInput
							label={`${homeTeamName} ${t("scoreboard.score")}`}
							id={"Home_Team_NAME_SCORE"}
							value={scoreTeamA}
							min={0}
							changeHandler={(e) => {
								setTeamScoreHandler(e?.target?.value * 1, "home");
							}}
							inputClassName="scoreboard-time-container"
							showCTAButton={true}
							onClickDecrease={() => {
								let scoreA = scoreTeamA;
								setTeamScoreHandler(scoreA - 1, "home");
							}}
							onClickIncrease={() => {
								let scoreA = scoreTeamA;
								setTeamScoreHandler(scoreA + 1, "home");
							}}
							disabledButton={scoreTeamA <= 0}
							disabledAllButton={scoreLoading}
						/>
					</div>
				</div>

				<div className={classes["scoreboard-item--topcta_items"]}>
					<div className={classes["scoreboard-item--topcta_items_score"]}>
						<ScoreBoardInput
							label={`${awayTeamName} ${t("scoreboard.score")}`}
							id={"Away_Team_Name_Score"}
							value={scoreTeamB}
							min={0}
							changeHandler={(e) => {
								setTeamScoreHandler(e?.target?.value * 1, "away");
							}}
							inputClassName="scoreboard-time-container"
							showCTAButton={true}
							onClickDecrease={() => {
								let scoreB = scoreTeamB;
								setTeamScoreHandler(scoreB - 1, "away");
							}}
							onClickIncrease={() => {
								let scoreB = scoreTeamB;
								setTeamScoreHandler(scoreB + 1, "away");
							}}
							disabledButton={scoreTeamB <= 0}
							// not allow to change score when sending API request
							disabledAllButton={scoreLoading}
						/>
					</div>
				</div>
			</div>

			<div className={classes["scoreboard-time"]}>
				<ScoreBoardInput
					label={t("scoreboard.selectPeriod")}
					id={"Select_Period"}
					value={gamePeriod * 1}
					min={0}
					changeHandler={(e) => {
						periodChangeHandler(e?.target?.value * 1);
					}}
					inputClassName="scoreboard-time-container"
					showCTAButton={true}
					onClickDecrease={() => {
						let periodB = gamePeriod;
						periodChangeHandler(periodB - 1);
					}}
					onClickIncrease={() => {
						let periodB = gamePeriod;
						periodChangeHandler(periodB + 1);
					}}
					disabledButton={gamePeriod <= 0}
				/>
			</div>

			<SwitchCheckBox
				id="showScore"
				switchChecked={showScore}
				label={t("scoreboard.showScore")}
				onChange={(val) => {
					showScoreHandler(val);
				}}
			/>
			<SwitchCheckBox
				id="showPeriod"
				switchChecked={showPeriod}
				label={t("scoreboard.showPeriod")}
				onChange={(val) => {
					showPeriodHandler(val);
				}}
			/>
			<SwitchCheckBox
				id="showScoreBoard"
				switchChecked={showScoreboard}
				onChange={(val) => {
					showScoreBoardHandler(val);
				}}
				label={t("scoreboard.showScoreboard")}
			/>
		</div>
	);
};

export default ScoreboardItem;

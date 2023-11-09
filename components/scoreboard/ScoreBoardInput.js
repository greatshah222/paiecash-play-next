import React from "react";

import classes from "@/app/styles/scoreboard.module.css";

const ScoreBoardInput = ({
	changeHandler,
	label,
	value,
	disabled,
	min,
	id,
	inputClassName,
	showCTAButton,
	onClickIncrease,
	onClickDecrease,
	disabledButton,
	disabledAllButton,
}) => {
	return (
		<>
			<div
				className={classes[inputClassName]}
				style={{
					flexDirection: "column",
				}}
			>
				<p className="text-md">{label}</p>
				<input
					className={`text-md regular text-gray-700 disabled:text-white`}
					placeholder="&nbsp;"
					id={id}
					type="number"
					onChange={(e) => {
						changeHandler(e);
					}}
					value={value}
					disabled={disabled || disabledAllButton}
					min={min}
				/>
			</div>

			{showCTAButton && (
				<>
					<div
						className={`${classes.teamNameButton} text-md ${classes["scoreboard-item--topcta_items_button_item"]}`}
					>
						<button
							className={classes.decreaseScoreButton}
							disabled={disabledButton || disabledAllButton}
							onClick={onClickDecrease}
						>
							-1
						</button>
						<button onClick={onClickIncrease} disabled={disabledAllButton}>
							+1
						</button>
					</div>
				</>
			)}
		</>
	);
};

export default ScoreBoardInput;

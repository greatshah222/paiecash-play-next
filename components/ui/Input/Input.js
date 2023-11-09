import React, { useReducer, useEffect } from "react";

// THIRD PARTY IMPORT
import Select from "react-select";
import { useTranslation } from "react-i18next";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as rdrLocales from "react-date-range/dist/locale";

import { validate } from "../Validation/Validator";
import AppConfig from "@/config";

import classes from "./Input.module.css";

const inputReducer = (state, action) => {
	const { type, value, validators } = action;

	switch (type) {
		case "CHANGE":
			return {
				...state,
				value,
				isValid: validate(value, validators),
			};
		case "TOUCH":
			return {
				...state,
				isTouched: true,
			};

		case "CHANGE_DATE":
			return {
				...state,
				value,
				isValid: true,
			};

		default:
			return state;
	}
};

export const Input = ({
	onInput,
	id,
	validators,

	type,
	element,
	placeholder,
	rows,
	errorText,
	label,
	labelInfo,
	initialValid,
	initialValue,
	iconName,
	selectData,
	disabled,
	style,
	button_label,
	changeButton,
	checked,
	switchChangedHandler,
	required,
	selectHomePage,
	colorStyles,
	defaultValue,

	...props
}) => {
	const defaultColorStyles = {
		control: (styles, state) => ({
			...styles,
			borderRadius: "1rem",
			height: "50px",
			minHeight: "50px",
			maxHeight: "50px",
			backgroundColor: "white",
			borderColor: "#00acde",
		}),
	};
	const { t } = useTranslation();

	const initialState = {
		value: initialValue || "",
		isValid: initialValid || false,
		isTouched: false,
	};
	const [state, dispatch] = useReducer(inputReducer, initialState);

	const { value, isValid, isTouched } = state;
	// as soon as the Input element is loaded it takes the value from the state and sends to the onInput which is our
	useEffect(() => {
		// if the function onInput is called it will the function InputHandler in form-hook(for validity check). ALl the data will be passed from here. This function Inputs all handle one input whereas onInput which in returns InputHandler is responsible for handling all the form
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);

	const changehandler = (e, date, duration) => {
		if (props.isMulti ? e[0]?.value && e[0]?.label : e?.value && e?.label) {
			// it means it belongs to select_dropdown

			// is multi means they will have multiple values and should be an array

			dispatch({
				type: "CHANGE",
				value: props.isMulti ? e.map((el) => el?.value) : e?.value,
				validators,
			});
		} else if (date) {
			return dispatch({
				type: "CHANGE_DATE",
				value: date,
				validators,
			});
		} else {
			dispatch({
				type: "CHANGE",
				value: e.target.value,
				validators,
			});
		}
	};
	const touchedHandler = () => {
		dispatch({ type: "TOUCH" });
	};

	let elements;

	if (element === "input") {
		if (type === "date_time") {
			// THIS IS FOR DATE AND TIME SELECTION IN GAME
			elements = (
				<div className="py-2">
					<p
						className={`text-muted-foreground text-sm `}
						style={{
							padding: "0rem 0rem 0.2rem 1rem",
						}}
					>
						{label}
					</p>
					<label
						className={` ${
							!isValid && isTouched && classes.formInputInvalid
						} rounded-full w-full flex `}
					>
						<div className="w-full flex relative">
							<DatePicker
								className={`${classes.input_text} text-black text-base rounded-full w-full disabled:bg-gray-100 disabled:cursor-not-allowed`}
								selected={value}
								onChange={(date) => changehandler(date, date)}
								timeFormat="HH:mm"
								timeIntervals={5}
								timeCaption="aika"
								dateFormat="MMMM d, yyyy H:mm "
								locale={
									AppConfig.organization.language.includes("fi")
										? rdrLocales.fi
										: rdrLocales["enUS"]
								}
								onBlur={touchedHandler}
								value={value}
								required={required}
								showMonthDropdown
								showYearDropdown
								showTimeSelect
								dropdownMode="select"
								disabled={disabled}
							/>
						</div>
					</label>
					{labelInfo && (
						<p
							className={`text-muted-foreground text-xs `}
							style={{
								padding: "0rem 0rem 0.2rem 1rem",
							}}
						>
							{labelInfo}
						</p>
					)}
				</div>
			);
		} else {
			elements = (
				<div
					className={`${classes.input_container} ${
						!isValid && isTouched && classes.formInputInvalid
					} rounded-full my-3 `}
				>
					<input
						className={`${classes.input_text} text-black text-base rounded-full`}
						placeholder="&nbsp;"
						id={id}
						type={type}
						onChange={changehandler}
						onBlur={touchedHandler}
						value={value}
						disabled={disabled}
						style={style}
						aria-label={t(label?.props?.text)}
						name={id}
					/>
					<label
						htmlFor={t(label?.props?.text)}
						className={`${classes.input_container_label}  text-gray-500 text-sm`}
					>
						{label}
					</label>
					{labelInfo && (
						<p
							className={`text-muted-foreground text-xs `}
							style={{
								padding: "0rem 0rem 0.2rem 1rem",
							}}
						>
							{labelInfo}
						</p>
					)}
				</div>
			);
		}
	} else if (element === "textarea") {
		elements = (
			<div className="py-2">
				<p
					className={`text-muted-foreground text-sm `}
					style={{
						padding: "0rem 0rem 0.2rem 1rem",
					}}
				>
					{label}
				</p>

				<textarea
					id={id}
					onChange={changehandler}
					onBlur={touchedHandler}
					value={value}
					name={id}
					rows={rows || 3}
					className={`${classes.input_text} rounded-full regular `}
				/>
				{labelInfo && (
					<p
						className={`text-muted-foreground text-xs my-2 `}
						style={{
							padding: "0rem 0rem 0.2rem 1rem",
						}}
					>
						{labelInfo}
					</p>
				)}
			</div>
		);
	} else if (element === "select_dropdown") {
		elements = (
			<div className="py-2">
				<p
					className={`text-muted-foreground text-sm `}
					style={{
						padding: "0rem 0rem 0.2rem 1rem",
					}}
				>
					{label}
				</p>

				<div className={`text-black text-base rounded-full`}>
					<Select
						options={selectData}
						onChange={changehandler}
						onBlur={touchedHandler}
						placeholder={placeholder}
						className="text-base text-muted-foreground rounded-full"
						styles={colorStyles ? colorStyles : defaultColorStyles}
						defaultValue={defaultValue?.label && defaultValue}
						isDisabled={disabled}
						aria-label={labelInfo}
						{...props}
					/>
				</div>
				{labelInfo && (
					<p
						className={`text-muted-foreground text-xs my-2 `}
						style={{
							padding: "0rem 0rem 0.2rem 1rem",
						}}
					>
						{labelInfo}
					</p>
				)}
			</div>
		);
	}
	return (
		<>
			{elements}
			{!isValid && isTouched && errorText && (
				<p className={`${classes.errorText} text-xs regular py-2`}>{errorText}</p>
			)}
		</>
	);
};

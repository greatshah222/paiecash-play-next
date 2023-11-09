import validatorNumber from "validator";
import { phone } from "phone";

var validatorEmail = require("email-validator");

const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_FILE = "FILE";
const VALIDATOR_TYPE_PASSWORDMATCH = "PASSWORDMATCH";
const VALIDATOR_TYPE_NUMBER = "NUMBER";
const VALIDATOR_TYPE_PHONE = "PHONE";

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });

export const VALIDATOR_PHONE = (val) => ({
	type: VALIDATOR_TYPE_PHONE,
	val: val,
});

export const VALIDATOR_NUMBER = (val) => ({ type: VALIDATOR_TYPE_NUMBER, val });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
	type: VALIDATOR_TYPE_MINLENGTH,
	val: val,
});
export const VALIDATOR_PASSWORDMATCH = (password, passwordConfirm) => ({
	type: VALIDATOR_TYPE_PASSWORDMATCH,
	val: { password, passwordConfirm },
});
export const VALIDATOR_MAXLENGTH = (val) => ({
	type: VALIDATOR_TYPE_MAXLENGTH,
	val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
// if there is no validation
export const VALIDATOR_NONE = () => ({
	type: "VALIDATOR_NONE",
});

export const validate = (value, validators) => {
	let isValid = true;
	for (const validator of validators) {
		if (validator.type === "VALIDATOR_NONE") {
			isValid = true;
		}
		if (validator.type === VALIDATOR_TYPE_NUMBER) {
			isValid = validatorNumber.isNumeric(value) && value * 1 >= 0.1;
		}
		if (validator.type === VALIDATOR_TYPE_PHONE) {
			if (!validator.val) return (isValid = true); // cause phone is not compulsory params
			let x = phone(value, { country: "fin", validateMobilePrefix: true });
			isValid = x.isValid;
		}

		if (validator.type === VALIDATOR_TYPE_PASSWORDMATCH) {
			isValid = isValid && validator.val.password.trim() === value.trim();
		}
		if (validator.type === VALIDATOR_TYPE_REQUIRE) {
			if (Number(value)) {
				return (isValid = isValid && true);
			}
			isValid = isValid && value.trim().length > 0;
		}
		if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
			isValid = isValid && value.trim().length >= validator.val;
		}
		if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
			isValid = isValid && value.trim().length <= validator.val;
		}
		if (validator.type === VALIDATOR_TYPE_MIN) {
			isValid = isValid && +value >= validator.val;
		}
		if (validator.type === VALIDATOR_TYPE_MAX) {
			isValid = isValid && +value <= validator.val;
		}
		if (validator.type === VALIDATOR_TYPE_EMAIL) {
			// true
			isValid = isValid && validatorEmail.validate(value);
		}
	}
	return isValid;
};

export const removeDateFromString = (inputString) => {
	if (!inputString) return "";
	return inputString.replace("2023-24", "").trim("");
};

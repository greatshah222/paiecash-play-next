import moment from "moment";

export const momentDate = (el, onlydate, language) => {
	return onlydate
		? moment(el)
				.locale(language?.includes("en") ? "en" : "fi")
				.format("DD.MM.YYYY ")
		: moment(el)
				.locale(language?.includes("en") ? "en" : "fi")
				.format("dddd,  DD.MM.YYYY ");
};

export const convertDuration = (dur) => {
	const dS = Number(dur);

	const h = Math.floor(dS / 3600);
	const m = Math.floor((dS % 3600) / 60);
	const s = Math.floor((dS % 3600) % 60);

	let ret = "";

	if (dS <= 0) {
		return "0 s";
	}
	if (h > 0) {
		ret += `${h} h `;
	}
	if (m > 0) {
		ret += `${m} m `;
	}
	if (s > 0) {
		ret += `${s} s `;
	}
	return ret;
};

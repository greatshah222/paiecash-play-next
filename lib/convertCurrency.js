export const convertCurrency = (currency) => {
	switch (currency.toLowerCase()) {
		case "eur":
			return "€";
		case "ksh":
			return "KsH";
		case "dol":
			return "$";
		case "nad":
			return "N$";
		default:
			return "";
	}
};

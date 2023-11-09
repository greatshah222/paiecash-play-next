import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: require("./locales/en.json"),
		},
		fi: {
			translation: require("./locales/fi.json"),
		},
		fr: {
			translation: require("./locales/fr.json"),
		},
	},
	lng: "fr", // if you're using a language detector, do not defrne the lng option
	fallbackLng: "fr",

	interpolation: {
		escapeValue: false,
	},
});

export default i18n;

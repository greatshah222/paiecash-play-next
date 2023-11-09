"use client";

import i18n from "@/i18n/i18n";
import { I18nextProvider } from "react-i18next";

export const ReactNexti18nProvider = ({ children }) => {
	return (
		<I18nextProvider i18n={i18n} defaultNS={"translation"}>
			{children}
		</I18nextProvider>
	);
};

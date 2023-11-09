"use client";
import { CookiesProvider } from "react-cookie";

export const ReactCookiesProvider = ({ children }) => {
	return <CookiesProvider> {children}</CookiesProvider>;
};

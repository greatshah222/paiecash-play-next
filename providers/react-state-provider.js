"use client";
import StateHolder from "@/context/StateHolder";

export const ReactStateProvider = ({ children }) => {
	return <StateHolder> {children}</StateHolder>;
};

"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "./ui/button";
import Translations from "./Translations";
import { Input } from "./ui/input";

const SearchBar = ({ submitHanlder, setSearchFieldInput, searchFieldInput, disabled }) => {
	const [isMounted, setIsMounted] = useState(false);
	const { t } = useTranslation();

	useEffect(() => {
		setIsMounted(true);
	}, []);
	if (!isMounted) return null;

	return (
		<form
			className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 bg-white text-black"
			onSubmit={submitHanlder}
		>
			<div className={`w-full h-[48px] col-span-12 lg:col-span-10`}>
				<Input
					className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full"
					type="text"
					value={searchFieldInput}
					onChange={(e) => setSearchFieldInput(e.target.value)}
					placeholder={t("search.searchByName")}
				/>
			</div>
			<Button
				disabled={!searchFieldInput || disabled}
				aria-label="Seach games"
				className="col-span-12 lg:col-span-2 w-full bg-brand"
			>
				<Translations text="navigation.navbar.search" />
			</Button>
		</form>
	);
};

export default SearchBar;

"use client";

// NEXT AND REACT IMPORT

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { searchGames } from "@/utils/datahandler";
import Container from "@/components/ui/container";
import EventItems from "@/components/EventItems/event-items";
import SearchBar from "@/components/search-bar";
import AppConfig from "@/config";
import EventGridSkeleton from "@/components/ui/loading/event-grid-loading";
import NoGames from "@/components/Events/no-games";

const Search = () => {
	const router = useRouter();
	const searchParam = useSearchParams();

	const query = searchParam?.get("value");

	const [searchResult, setSearchResult] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchFieldInput, setSearchFieldInput] = useState("");

	const [initialResultFetched, setInitialResultFetched] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		if (query) {
			// Trigger new search when query param changes
			// TODO: Perform search with new query
			setIsLoading(true);

			const fetchData = async () => {
				setSearchFieldInput(query);
				setInitialResultFetched(true);
				const response = await searchGames(AppConfig.organization.organizationId, query);
				if (response.data.status === "ok") {
					setSearchResult(response?.data?.games);
				}
				setIsLoading(false);
			};
			fetchData();
		}
	}, [query, router, searchParam]);

	useEffect(() => {
		setIsMounted(true);
	}, []);
	if (!isMounted) return null;

	const searchButtonHandler = (e) => {
		e.preventDefault();

		router.push(`/search?value=${searchFieldInput}`);
	};

	return (
		<Container className={"flex gap-5 flex-col flex-1 min-h-screen"}>
			{/* // HERE MIN-H-SCREEN IS COMPULSORY  */}
			<SearchBar
				submitHanlder={searchButtonHandler}
				setSearchFieldInput={setSearchFieldInput}
				searchFieldInput={searchFieldInput}
				disabled={isLoading}
			/>
			{isLoading ? (
				<EventGridSkeleton />
			) : searchResult?.length > 0 ? (
				<EventItems allEvents={searchResult} hideCarousel />
			) : (
				searchFieldInput && initialResultFetched && <NoGames />
			)}
		</Container>
	);
};

export default Search;

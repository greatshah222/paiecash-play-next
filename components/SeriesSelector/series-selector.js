"use client";

import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { useMyContext } from "@/context/StateHolder";
import { getAllGamesFilter } from "@/utils/datahandler";
import { cn } from "@/lib/utils";
import Header from "../ui/Header/header";
import Translations from "../Translations";

export default function SeriesSelectorDropDown({ organizationId }) {
	const {
		selectedArea,
		setSelectedArea,
		selectedLevelContext,
		setSelectedLevelContext,
		setResetSelectedArea,
		setResetSelectedLevel,
	} = useMyContext();

	const [loading, setLoading] = useState(true);

	const [areas, setAreas] = useState(null);
	const [teams, setTeams] = useState(null);

	const [levels, setLevels] = useState(null);

	const fetchAllFilters = (a) => {
		return getAllGamesFilter(a);
	};
	const { isLoading, data } = useQuery(
		[`seriesSelector${organizationId}`, organizationId],
		() => fetchAllFilters(organizationId),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnSuccess: false,
			refetchInterval: false,
		}
	);

	useEffect(() => {
		const fetchAllFilters = async (res) => {
			if (res?.data?.teams) {
				let g = [];
				Object.entries(res?.data?.teams).forEach((el, i) => {
					g.push({ label: el[1], value: el[0] });
				});
				setTeams(g);
			}

			if (res?.data?.areas) {
				let h = [];

				Object.entries(res?.data?.areas).forEach((el, i) => {
					h.push({ label: el[1], value: el[0] });
				});
				setAreas(h);
			}

			if (res?.data?.levels) {
				let y = [];
				Object.entries(res?.data?.levels).forEach((el, i) => {
					y.push({ label: el[1], value: el[0] });
				});
				setLevels(y);
			}

			setLoading(false);
		};

		if (!isLoading) {
			fetchAllFilters(data?.data);
		}

		return () => {
			setTimeout(() => {
				setSelectedArea([]);
				setSelectedLevelContext([]);
			}, 100);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, setSelectedArea, setSelectedLevelContext]);

	const selectorHandler = (label, el) => {
		// we have to store this result in context and later fetch upcoming event live event and past events based on these filters
		if (label === "areas") {
			// we check if this already exists ->if it exists we need to remove it

			let y = selectedArea.find((el1) => el1 * 1 === el?.value * 1);
			if (y) {
				// remove the element
				let z = selectedArea.filter((el1) => el1 * 1 !== el?.value * 1);
				if (z?.length === 0) {
					setResetSelectedArea(true);
				}

				setSelectedArea(z);
			} else {
				// add the element
				setResetSelectedArea(false);
				setSelectedArea((prev) => [...prev, el?.value]);
			}
		} else if (label === "levels") {
			// we check if this already exists ->if it exists we need to remove it

			let y = selectedLevelContext.find((el1) => el1 * 1 === el?.value * 1);
			if (y) {
				// remove the element
				let z = selectedLevelContext.filter((el1) => el1 * 1 !== el?.value * 1);
				if (z?.length === 0) {
					setResetSelectedLevel(true);
				}
				setSelectedLevelContext(z);
			} else {
				// add the element
				setResetSelectedLevel(false);
				setSelectedLevelContext((prev) => [...prev, el?.value]);
			}
		}
	};

	return (
		<>
			<Header title={<Translations text="serieSelector.title" />} />

			{!loading && (
				<>
					<div className={`flex flex-col gap-4 font-probold mb-10`}>
						{areas?.length > 0 && (
							<div className="flex flex-nowrap gap-2 justify-start items-center custom-scrollbar overflow-x-auto overflow-y-hidden overflow-auto">
								{areas.map((el) => (
									<p
										key={el?.value}
										onClick={() => selectorHandler("areas", el)}
										className={cn(
											`text-base   min-w-max border-brandHover border px-4 mb-2 py-2 text-white rounded-full cursor-pointer hover:bg-brandHover`,
											selectedArea?.find((el1) => el1 * 1 === el?.value * 1) && "bg-brandHover"
										)}
									>
										{el.label}
									</p>
								))}
							</div>
						)}
						{levels?.length > 0 && (
							<div className="flex flex-nowrap gap-2 justify-start items-center flex-row-reverse custom-scrollbar overflow-x-auto overflow-y-hidden">
								{levels.map((el) => (
									<p
										key={el?.value}
										onClick={() => selectorHandler("levels", el)}
										className={cn(
											`text-base   min-w-max border-brandHover border px-4 mb-2 py-2 text-white rounded-full cursor-pointer hover:bg-brandHover`,
											selectedLevelContext?.find((el1) => el1 * 1 === el?.value * 1) &&
												"bg-brandHover"
										)}
									>
										{el.label}
									</p>
								))}
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
}

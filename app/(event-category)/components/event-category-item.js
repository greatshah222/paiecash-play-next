"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

import EventItems from "@/components/EventItems/event-items";
import { getAllGames } from "@/utils/datahandler";

import EventCategoryFilter from "./event-category-filter";
import EventGridSkeleton from "../../../components/ui/loading/event-grid-loading";

const EventCategoryItem = ({ orgId, type, title, admin }) => {
	const [allEvents, setAllEvents] = useState(null);

	const { t } = useTranslation();
	const fetchGames = (a, b, c) => {
		return getAllGames(
			type,

			a,
			b,
			c
		); // FIX ME -A,B,C,D,E
	};

	const { data, isLoading, refetch, isFetching } = useQuery(
		[`${type}-EventCategoryItem`, orgId],
		() => fetchGames(orgId, 100),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnSuccess: false,
			refetchInterval: false,
		}
	);

	useEffect(() => {
		if (!isLoading || !isFetching) {
			setAllEvents(data?.data?.games);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, isFetching]);

	if (isLoading || isFetching) {
		return <EventGridSkeleton />;
	}
	return (
		<div>
			<EventCategoryFilter
				orgId={orgId}
				setAllEvents={setAllEvents}
				refetch={refetch}
				title={t(title)}
			/>
			<EventItems allEvents={allEvents} hideCarousel admin={admin} />
		</div>
	);
};

export default EventCategoryItem;

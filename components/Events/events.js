"use client";

import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { useEffect } from "react";

import { useMyContext } from "@/context/StateHolder";
import { useSearchParams } from "@/hooks/search-hook";
import { getAllGames } from "@/utils/datahandler";
import { getEventTitle } from "@/lib/getEventTitle";
import { getEventsViewAllRoute } from "@/lib/getEventsViewAllRoute";

import EventItems from "../EventItems/event-items";
import EventCarouselSkeleton from "../ui/loading/event-carousel-loading";

// THIS WILL NEVER BE USED FROM ADMIN PANEL

const Events = ({ type, organizationId, limit }) => {
	const { subOrganizationId } = useParams();

	const {
		selectedArea,
		selectedLevelContext,
		resetSelectedLevel,
		resetSelectedArea,
		setSelectedArea,
		setResetSelectedArea,
		setSelectedLevelContext,
	} = useMyContext();
	const { searchParam } = useSearchParams(
		selectedArea,
		selectedLevelContext,
		resetSelectedArea,
		resetSelectedLevel
	);
	useEffect(() => {
		if (subOrganizationId) {
			// it means we are in child organization and will remove any filter if exists
			setSelectedLevelContext([]);
			setSelectedArea([]);
			setResetSelectedArea(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subOrganizationId]);

	const fetchGames = (a, b, c) => {
		return getAllGames(type, a, b, c); // FIX ME -A,B,C,D,E
	};
	const { data, isLoading, refetch } = useQuery(
		[
			`liveGame${searchParam}-${type} ${organizationId && organizationId}`,
			searchParam,
			organizationId,
		],
		() =>
			fetchGames(
				subOrganizationId ? subOrganizationId : organizationId,
				limit ? limit : 100,
				searchParam
			),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnSuccess: false,
			refetchInterval: false,
		}
	);

	if (isLoading) return <EventCarouselSkeleton />;
	return (
		<div className="mb-10">
			<EventItems
				allEvents={data?.data?.games}
				refetch={refetch}
				title={getEventTitle(type)}
				viewAllRoute={`/categories/${getEventsViewAllRoute(type)}/${
					subOrganizationId ? subOrganizationId : organizationId
				}`}
			/>
		</div>
	);
};

export default Events;

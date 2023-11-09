"use client";

import { SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/bundle";

import CustomCarousel from "../ui/CustomCarousel";
import EventItem from "./event-item";

import Header from "../ui/Header/header";
import NoGames from "../Events/no-games";
import { useTranslation } from "react-i18next";

const EventItems = ({ allEvents, hideCarousel, title, viewAllRoute, admin }) => {
	const { t } = useTranslation();

	if (allEvents?.length === 0 || !allEvents) {
		return (
			<>
				<Header title={t(title)} className="my-4" />

				<NoGames />
			</>
		);
	}
	const data = allEvents?.map((el) => (
		<SwiperSlide key={el?.gameId}>
			<EventItem item={el} />
		</SwiperSlide>
	));

	const EventsItemGrid = ({ admin }) => {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
				{allEvents?.map((el) => (
					<EventItem item={el} key={el?.gameId} admin={admin} />
				))}
			</div>
		);
	};

	if (hideCarousel) return <EventsItemGrid admin={admin} />;

	return (
		<>
			<Header title={t(title)} viewAllLink={viewAllRoute} className={"my-4"} />

			<CustomCarousel>{data}</CustomCarousel>
		</>
	);
};

export default EventItems;

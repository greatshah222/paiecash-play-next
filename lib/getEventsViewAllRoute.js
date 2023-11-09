export const getEventsViewAllRoute = (typeId) => {
	const eventTitleMap = {
		past: "past-events",
		live: "live-events",
		upcoming: "upcoming-events",
	};

	return eventTitleMap[typeId];
};

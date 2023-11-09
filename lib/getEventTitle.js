export const getEventTitle = (typeId) => {
	const eventTitleMap = {
		"past-events": "events.past",
		"live-events": "events.live",
		"upcoming-events": "events.upcoming",
		past: "events.past",
		live: "events.live",
		upcoming: "events.upcoming",
	};

	return eventTitleMap[typeId];
};

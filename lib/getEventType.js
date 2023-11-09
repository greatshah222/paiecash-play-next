export const getEventType = (typeId) => {
	const eventTitleMap = {
		"past-events": "past",
		"live-events": "live",
		"upcoming-events": "upcoming",
	};

	return eventTitleMap[typeId];
};

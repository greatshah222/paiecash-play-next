export const findEventType = (event) => {
	let currentTime = Date.now();
	let startTime = event?.startTime;
	let endTime = Number(event?.startTime) + Number(event?.duration * 1000);

	if (currentTime > endTime) {
		// EVENT IS IN THE PAST

		return "past";
	} else {
		// CAN BE BOTH LIVE OR FUTURE EVENT
		if (startTime <= currentTime && endTime >= currentTime) {
			// EVENT IS LIVE
			return "live";
		} else {
			// EVENT IS IN FUTURE

			return "upcoming";
		}
	}
};

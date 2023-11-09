export const changeGameTimeToUnix = (timeString, dateString) => {
	if (!dateString || !timeString) return null;
	const [year, month, day] = dateString?.split("-").map(Number);
	const [hours, minutes, seconds] = timeString?.split(":").map(Number);

	const targetDate = new Date(year, month - 1, day, hours, minutes, seconds);

	return Math.floor(targetDate.getTime());
};

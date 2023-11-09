import { scoreBoardHandler } from "@/utils/datahandler";

let USE_UPDATED_API_ENDPOINT = true;

export const checkScoreboardInitialStatus = async (serviceId, token, eventType, gameId) => {
	if (eventType !== "live") {
		return {
			isAlreadyInitiated: null,
			currentStreamScoreboardParams: null,
		};
	}
	const data = {
		streamName: serviceId,
	};
	const scoreboardRes = await scoreBoardHandler(data, token);

	let currentStreamScoreboardParams;

	let isAlreadyInitiated = !!scoreboardRes?.data?.wowzaResponse?.streamSettings?.enable;

	if (scoreboardRes?.data?.status === "ok") {
		// IF SCOREBOARD HAS ALREDY BEEN INITIATED WE CHECK IF IT WAS DONE BY THIS STREAM. IF NOT DONE BY THIS STREAM WE DISABLE IT
		if (isAlreadyInitiated) {
			if (
				scoreboardRes?.data?.wowzaResponse.streamSettings?.lowerThirdText * 1 > 0 &&
				scoreboardRes?.data?.wowzaResponse.streamSettings?.lowerThirdText * 1 !== gameId * 1
			) {
				const resetData = {
					streamName: serviceId,

					timerStatus: "RESET",
					scoreLeft: 0,
					scoreRight: 0,
					enable: false,
				};
				await scoreBoardHandler(resetData, token, USE_UPDATED_API_ENDPOINT);
				// WE ALSO NEED TO HIDE THE SCOREBOARD

				const data = {
					streamName: serviceId,
					scoreboardImage: "",
				};

				await scoreBoardHandler(data, token);
				isAlreadyInitiated = false;
			} else {
				// THIS OVERLAY IS FOR CURRENT STREAM AND WE HAVE TO GET THE SCOREBOARD PARAMETERS FROM THERE
				currentStreamScoreboardParams = await scoreBoardHandler(
					data,
					token,
					USE_UPDATED_API_ENDPOINT
				);
				currentStreamScoreboardParams = currentStreamScoreboardParams?.data;
			}
		}
	}

	return {
		isAlreadyInitiated,
		currentStreamScoreboardParams,
	};
};

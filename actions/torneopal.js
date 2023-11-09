import AppConfig from "@/config";
import axios from "axios";

export const fetchTorneoGames = async (club_id) => {
	//     categoryId (this is level+region). For f-liiga these are used values. In salibandytv this might need different solution.
	// F-liiga miehet: 402
	// F-liiga naiset: 384
	// Teams inside those two categories shouldn't be shown on team list

	// const res = await axios.get(`
	// https://saliband.api.torneopal.com/taso/rest/getMatches?api_key=${process.env.TORNEOPAL_API_KEY}&season_id=${AppConfig.organization.torneopalSeasonId}&club_id=${club_id}

	// `);

	// let filteredFlligaMatches = res?.data?.matches?.filter(
	// 	(el) => el?.category_id * 1 !== 402 && el?.category_id * 1 !== 384
	// );

	// return filteredFlligaMatches;

	try {
		const res = await axios.get(`
	https://salibandy.api.torneopal.com/taso/rest/getMatches?api_key=${process.env.TORNEOPAL_API_KEY}&season_id=${AppConfig.organization.torneopalSeasonId}&club_id=${club_id}

	`);

		let filteredFlligaMatches = res?.data?.matches?.filter(
			(el) => el?.category_id * 1 !== 402 && el?.category_id * 1 !== 384
		);

		return filteredFlligaMatches;
	} catch (error) {
		return error;
	}
};

export const fetchGame = async (match_id) => {
	try {
		return await axios.get(`
    https://salibandy.api.torneopal.com/taso/rest/getMatch?api_key=${process.env.TORNEOPAL_API_KEY}&season_id=${AppConfig.organization.torneopalSeasonId}&match_id=${match_id}

    `);
	} catch (error) {
		return error;
	}
};

export const getTorneoClubs = async () => {
	try {
		return await axios.get(
			`https://salibandy.api.torneopal.com/taso/rest/getClubs?api_key=${process.env.TORNEOPAL_API_KEY}&season_id=${AppConfig.organization.torneopalSeasonId}`
		);
	} catch (error) {
		return error;
	}
};

export const getClubBasedonNodeonClubId = async (club_sport_id) => {
	try {
		return await axios.get(`
    https://salibandy.api.torneopal.com/taso/rest/getClub?api_key=${process.env.TORNEOPAL_API_KEY}&club_sport_id=${club_sport_id}&season_id=${AppConfig.organization.torneopalSeasonId}
    
    `);
	} catch (error) {
		return error;
	}
};

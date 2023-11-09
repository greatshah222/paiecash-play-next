import AppConfig from "@/config";
import axios from "axios";

export const updateSingleGame = async (event, token) => {
	try {
		let url = `${AppConfig.BASE_URL}/game`;

		const res1 = await axios({
			method: "put",
			url: url,

			data: event,

			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return res1;
	} catch (error) {
		console.log(error);
		return error;
	}
};
export const createNewGame = async (event, token) => {
	try {
		let url = `${AppConfig.BASE_URL}/game`;

		const res1 = await axios({
			method: "post",
			url: url,

			data: event,

			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return res1;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const createTicketAccess = async (ticketObject, token, edit) => {
	try {
		let url = `${AppConfig.BASE_URL}/event/accesscontrol`;
		const res1 = await axios({
			method: edit ? "put" : "post",
			url: url,

			data: ticketObject,

			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return res1;
	} catch (error) {
		console.log(error);
		return error;
	}
};

import axios from "axios";

import {
	createAccountToken,
	createAssetIdToken,
	createChangePasswordToken,
	createGeneralToken,
	createSubOrgToken,
	getCurrentTime,
} from "@/lib/tokenCreation";
import AppConfig from "@/config";
import { ACTIONS } from "@/constants/action";

export const getAllGames = (type, organizationId, limit = 100, searchParams) => {
	try {
		const currentTime = Date.now();
		let url = `${AppConfig.BASE_URL}/games?action=search&version=02&organizationId=${organizationId}&skip=0&limit=${limit}`;

		if (type === "live") {
			url = `${url}&ongoing=true`;
		} else if (type === "past") {
			url = `${url}&order=desc&to=${currentTime}`;
		} else if (type === "upcoming") {
			url = `${url}&from=${currentTime}&order=asc`;
		}

		if (searchParams) {
			url = `${url}${searchParams}`;
		}
		return axios.get(url);
	} catch (error) {
		console.log("error", error);
	}
};

export const searchGames = async (organizationId, keyword, limit) => {
	try {
		let url = `${
			AppConfig.BASE_URL
		}/games?action=search&version=02&organizationId=${organizationId}&skip=0&limit=${
			limit ? limit : 100
		}&keyword=${keyword}`;
		return await axios.get(url);
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const getFilteredGames = (organizationId, limit, from, to) => {
	try {
		let url = `${
			AppConfig.BASE_URL
		}/games?action=search&version=02&organizationId=${organizationId}&skip=0&limit=${
			limit ? limit : 100
		}&order=desc`;

		url = `${url}&to=${to}&from=${from}`;

		return axios.get(url);
	} catch (error) {
		console.log(error);
	}
};

export const getAllGamesFilter = async (organizationId) => {
	try {
		let url = `${AppConfig.BASE_URL}/games?organizationId=${organizationId}&action=getFilters`;

		return axios.get(url);
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const getChannels = async (organizationId, secret) => {
	try {
		return await axios.get(
			`${AppConfig.BASE_URL}/organization?action=getOrganization&version=04&organizationId=${organizationId}&includeSubOrganizations=true&token=${secret}`
		);
	} catch (error) {
		console.log(error);
	}
};

export const getSingleEvent = async (organizationId, eventId) => {
	try {
		return await axios.get(
			`${AppConfig.BASE_URL}/events?action=getEvent&version=02&organizationId=${organizationId}&eventId=${eventId}`
		);
	} catch (error) {}
};

export const getSingleEventAdmin = async (organizationId, eventId, token) => {
	try {
		let url = `${
			AppConfig.BASE_URL_MY
		}/game?organizationId=${organizationId}&gameId=${eventId}&_=${Date.now()}`;

		return await axios({
			method: "get",
			url,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

// Get organizations packages based on given object (if no object given it will fetch all packages)
export const getPackages = async (organizationId, objectId, userToken) => {
	try {
		const params = {
			action: "getPackages",
			organizationId,
		};
		if (objectId > 0) {
			params.objectId = objectId;
		}
		if (userToken) {
			params.userToken = userToken;
		}
		const packagesResponse = await axios.get(`${AppConfig.BASE_URL}/packages`, {
			params,
		});

		return packagesResponse.data;
	} catch (err) {
		console.log(err);
	}
};

// Get organizations payment methods
export const getPaymentMethods = async (organizationId) => {
	try {
		const params = {
			action: "getPaymentMethods",
			organizationId,
		};
		return await axios.get(`${AppConfig.BASE_URL}/payment/methods`, { params });
	} catch (err) {
		console.log(err);
	}
};

export const getPaymentUrl = async (
	userToken,
	organizationId,
	packageId,
	paymentMethodId,
	userEmail,
	handlerUrl,
	quantity
) => {
	try {
		const params = {
			action: "initPurchase",
			organizationId: AppConfig.organization.organizationId,
			subOrganizationId: organizationId,
			packageId,
			paymentMethodId,
			handlerUrl,
			vismaVersion: "wp31",
		};
		if (quantity > 0) {
			params.quantity = quantity;
			params.userEmail = userEmail;
		} else {
			params.userToken = userToken;
		}
		return await axios.get(`${AppConfig.BASE_URL_MY}/purchase`, { params });
	} catch (err) {
		console.log(err);
	}
};
export const voucherPurchase = async (
	userToken,
	languageId,
	organizationId,
	productId,
	voucherCode,
	quantity,
	usedByEmail
) => {
	try {
		const params = {
			action: "activateVoucher",
			voucherCode,
			languageId,
			productId,
			usedDate: new Date().getTime(),
			organizationId,
		};
		if (quantity > 0) {
			params.quantity = quantity;
			params.usedByEmail = usedByEmail;
		} else {
			params.userToken = userToken;
		}
		return await axios.get(`${AppConfig.BASE_URL_MY}/purchase`, { params });
	} catch (err) {
		console.log(err);
	}
};

export const getUser = async (userToken, organizationId) => {
	try {
		return await axios.get(
			`${AppConfig.BASE_URL}/user?action=getUserProfile&organizationId=${organizationId}&userToken=${userToken}`
		);
	} catch (err) {
		console.log(err);
	}
};
//get bought tickets
export const getUserTickets = async (organizationId, userToken, languageId) => {
	try {
		let params = {
			action: "getUserTickets",
			organizationId,
			userToken,
			languageId,
		};
		let url = `${AppConfig.BASE_URL}/user`;

		return await axios.get(url, { params });
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const findSubOrganizationSecret = async (organizationId, key, subOrganizationId) => {
	if (organizationId * 1 === subOrganizationId * 1) {
		return {
			secret: AppConfig.organization.key,
		};
	}
	const res = await getChannels(organizationId, key);
	console.log("res", res);

	return Object.values(res?.data?.organization?.subOrganizations).find(
		(el) => el.organizationId === subOrganizationId * 1
	);
};

export const findSubOrganizationSecretReactQuery = async (organizationId, key) => {
	return getChannels(organizationId, key);
};

export const getAsset = async (organizationId, assetId, key, languageId, user) => {
	try {
		const token = createAssetIdToken(organizationId, assetId, languageId, key);
		const itemResponse = await axios.get(
			`${AppConfig.BASE_URL}/publishing/getAsset?version=03&_=${Date.now()}`,
			{
				params: {
					organizationId,
					languageId,
					token,
					assetId,
					...(user?.user_id ? { userId: user?.user_id } : {}),
					...(user?.user_token ? { userToken: user?.user_token } : {}),
				},
			}
		);
		return itemResponse.data;
	} catch (err) {
		// console.log(err);
	}
};
export const getBanner = async (organizationId, groupItemId, token, lang, user) => {
	try {
		return await axios.get(
			`${
				AppConfig.BASE_URL
			}/publishing?action=getBanners&version=05&organizationId=${organizationId}&userId=${
				user?.user_id || 0
			}&userToken=${
				user?.user_token || ""
			}&languageId=${lang}&token=${token}&groupItemId=${groupItemId}&series=false`
		);
	} catch (err) {
		console.log(err);
	}
};

export const registerUser = async (organizationId, inputs, role, token) => {
	try {
		let url = `${AppConfig.BASE_URL_MY}/register?action=addSubscriber`;

		if (role?.includes("admin")) {
			// we also need to pass token when creating admin
			url = `${url}&token=${token}`;
		}
		const registerResponse = await axios.get(url, {
			params: {
				organizationId,
				emailAddress: inputs?.EMAIL?.value,
				userPassword: inputs?.PASSWORD?.value,

				// if no role means register as a subscriber
				...(role ? { role: role } : { role: "ismsubscriber" }),
			},
		});

		return registerResponse;
	} catch (err) {
		console.log(err);
	}
};

// REQUESTING RESET OF PASSWORD WHICH SENDS AN EMAIL TO USER EMAIL'S
export const requestResetPassword = async (emailAddress, organizationId, role, token) => {
	let url = `${AppConfig.BASE_URL}/user?action=resetPassword`;
	return await axios.get(url, {
		params: {
			organizationId,
			emailAddress,
			role,
			token,
		},
	});
};
// CHECK IF TOKEN FROM EMAIL IS VALID OR EXPIRED

export const validatePasswordResetToken = async (token) => {
	let url = `${AppConfig.BASE_URL_MY}/user?action=validatePasswordToken`;
	return await axios.get(url, {
		params: {
			token,
		},
	});
};

// RESET PASSWORD WHEN TOKEN IS FROM EMAIL
export const resetPasswordChange = async (newPassword, confirmPassword, token) => {
	let url = `${AppConfig.BASE_URL_MY}/user?action=setNewPassword`;
	return await axios.get(url, {
		params: {
			newPassword,
			confirmPassword,
			token,
		},
	});
};

export const changePassword = async (
	organizationId,
	key,
	userId,
	newPassword,
	confirmPassword,
	oldPassword,
	userToken
) => {
	const token = createChangePasswordToken(
		organizationId,
		key,
		userId,
		newPassword,
		confirmPassword
	);

	try {
		let url = `${AppConfig.BASE_URL_MY}/user?action=changePassword`;
		return await axios.get(url, {
			params: {
				organizationId,
				userId: userId,
				newPassword,
				confirmPassword,
				token,
				oldPassword,
				userToken,
			},
		});
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const fetchAllAdmins = async (organizationId, userToken) => {
	try {
		return await axios.get(
			`${AppConfig.BASE_URL_MY}/user?action=getUsers&organizationId=${organizationId}&userToken=${userToken}&role=ismaccount%20administrator`
		);
	} catch (error) {}
};

export const deleteUser = async (organizationId, userId, key, userToken) => {
	try {
		let currentTime = getCurrentTime();

		let paramUser = [organizationId, userId, currentTime, key];

		const token = createGeneralToken(paramUser, currentTime, "01");

		let params = {
			action: "removeUser",
			organizationId,
			userId,
			userToken,
			token,
		};
		let url = `${AppConfig.BASE_URL}/user`;

		return await axios.get(url, { params });
	} catch (error) {
		console.log(error);
	}
};

export const updateUser = async (
	userId,
	userToken,
	organizationId,
	key,
	firstName,
	lastName,
	phoneNumber,
	countryId,
	regionId,
	cityName,
	postalCode,
	eMail,
	admin
) => {
	const token = createAccountToken(
		userId,
		organizationId,
		key,
		firstName,
		lastName,
		phoneNumber,
		countryId,
		regionId,
		cityName,
		postalCode
	);

	try {
		let url = `${AppConfig.BASE_URL_MY}/user`;
		let params = {
			action: "updateUser",
			organizationId: organizationId,
			userToken: userToken,
			firstName: firstName,
			lastName: lastName,
			emailAddress: eMail,
			countryId: countryId,
			regionId: regionId,
			postalCode: postalCode,
			cityName: cityName,
			phoneNumber: phoneNumber,
			token: token,
			_: Date.now(),
		};

		if (admin) {
			params = {
				...params,
				userId,
			};
		}
		return await axios.get(url, { params });
	} catch (err) {
		console.log(err);
	}
};

//Get admin account settings (visma payment stuff)
export const getAccountSettings = async (organizationId, userToken) => {
	try {
		const params = {
			action: "getSettings",
			organizationId,
			userToken,
		};
		return await axios.get(`${AppConfig.BASE_URL}/account`, {
			params,
		});
	} catch (err) {
		console.log(err);
	}
};

export const updateAccountSettings = async (organizationId, userToken, settings) => {
	try {
		let params = {
			action: "updateSettings",
			organizationId,
			userToken,
		};
		let url = `${AppConfig.BASE_URL}/account`;

		return await axios.post(url, settings, { params });
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const createNewClub = async (
	organizationId,
	name,
	emailAddress,
	key,
	nodeonClubId,

	countryId = 88,
	regionId = "0",
	postalCode = "0",
	cityName = "Helsinki",

	phoneNumber = "0",

	accountType = "full-organization"
) => {
	try {
		let token = createSubOrgToken(
			organizationId,
			accountType,
			name,
			countryId,
			regionId,
			postalCode,
			cityName,
			phoneNumber,
			emailAddress,
			key
		);

		let params = {
			organizationId,
			accountType,
			name,
			countryId,
			regionId,
			postalCode,
			phoneNumber,
			cityName,
			emailAddress,
			token,
			edition: "ismaccount",
			templateId: 3,
			torneopalClubId: nodeonClubId,
			nodeonClubId,
		};

		// const url = `${AppConfig.BASE_URL_MY}/delegate/account?action=addOrganization`;
		const url = `https://my.icareus.com/delegate/account?action=addOrganization`;

		return await axios.get(url, { params });
	} catch (error) {
		console.log(error);
		console.log(error?.message);
		console.log(error?.stack);
	}
};

// return from bambora payment
export const getPurchasePackage = async (paramsObject) => {
	let params = paramsObject;

	params.action = ACTIONS.RETURN;

	return axios.get(`${AppConfig.BASE_URL_MY}/purchase/return`, { params });
};

export const deleteGame = async (organizationId, gameId, token) => {
	try {
		let url = `${AppConfig.BASE_URL_MY}/game?organizationId=${organizationId}&gameId=${gameId}`;

		const res1 = await axios({
			method: "delete",
			url: url,

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

export const scoreBoardHandler = async (data, token, scoreboardURL) => {
	// there are two end points for sending api request
	try {
		let url = `${AppConfig.BASE_URL_MY}/game/scoreboard?serviceId=${data.streamName}`;
		if (scoreboardURL) {
			url = `${AppConfig.BASE_URL_MY}/game/scoreboard?serviceId=${data.streamName}&scoreboard=true`;
		}

		return await axios({
			method: "POST",
			url,

			data,

			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (err) {
		console.log(err);
		return err;
	}
};

// CAMPAIGNS

export const getActiveCampaign = async (organizationId = AppConfig.organization.organizationId) => {
	// https://my.icareus.com/api/campaign/v5?action=getActiveCampaigns&organizationId=196288014¨
	try {
		const res = await axios.get(
			`${
				AppConfig.BASE_URL
			}/campaign/v5?action=getActiveCampaigns&organizationId=${organizationId}&_=${Date.now()}`
		);
		console.log("rescampaign", res);

		return res?.data;
	} catch (error) {
		console.log(error);
	}
};

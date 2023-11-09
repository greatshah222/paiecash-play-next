const crypto = require("crypto");

export const getCurrentTime = () => {
	return Math.floor(new Date().getTime() / 1000).toString(16);
};

export const createAssetIdToken = (organizationId, assetId, languageId, key, version = "03") => {
	const currentTime = getCurrentTime();
	let signature;

	if (!languageId) {
		signature = crypto
			.createHash("md5")
			.update(`${organizationId}:${assetId}:${currentTime}:${key}`)
			.digest("hex");
	} else {
		signature = crypto
			.createHash("md5")
			.update(`${organizationId}:${assetId}:${languageId}:${currentTime}:${key}`)
			.digest("hex");
	}

	return version + currentTime + signature;
};
export const getAssetsTokenCreation = (organizationId, assetId, languageId, key) => {
	const currentTime = getCurrentTime();
	let signature;

	/*   your token seems to be generated from:

    124292109:188060605:63ca6194:meHhZZLdX8

    instead of:

    124292109:188060605::63ca6194:meHhZZLdX8

    (missing the extra colon) */

	if (!languageId) {
		signature = crypto
			.createHash("md5")
			.update(`${organizationId}:${assetId}::${currentTime}:${key}`)
			.digest("hex");
	} else {
		signature = crypto
			.createHash("md5")
			.update(`${organizationId}:${assetId}:${languageId}:${currentTime}:${key}`)
			.digest("hex");
	}

	return "03" + currentTime + signature;
};

export const resetPasswordToken = (emailAddress, organizationId, role, key) => {
	const currentTime = getCurrentTime();
	const signature = crypto
		.createHash("md5")
		.update(`${emailAddress}:${organizationId}:${role}:${currentTime}:${key}`)
		.digest("hex");

	let version = "01";

	return version + currentTime + signature;
};

// TOKEN CREATOR FOR PASSWORD CHANGING PROCESS
export const createChangePasswordToken = (
	organizationId,
	key,
	userId,
	newPassword,
	confirmPassword
) => {
	const currentTime = getCurrentTime();
	const signature = crypto
		.createHash("md5")
		.update(`${organizationId}:${userId}:${newPassword}:${confirmPassword}:${currentTime}:${key}`)
		.digest("hex");

	return "01" + currentTime + signature;
};

// TOKEN CREATOR FOR ACCOUNT MANAGEMENT
export const createAccountToken = (
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
) => {
	const currentTime = getCurrentTime();
	const signature = crypto
		.createHash("md5")
		.update(
			`${organizationId}:${userId}:${firstName}:${lastName}:${countryId}:${regionId}:${postalCode}:${cityName}:${phoneNumber}:${currentTime}:${key}`
		)
		.digest("hex");

	return "01" + currentTime + signature;
};

export const createAdminUserToken = (organizationId, key) => {
	let currentTime = 0x12345678;
	let currentTimeStr = currentTime.toString(16);
	while (currentTimeStr.length < 8) {
		currentTimeStr = "0" + currentTimeStr;
	}
	let arg = "" + organizationId + ":" + currentTimeStr + ":" + key;
	let hash = crypto.createHash("md5").update(arg).digest("hex");
	let token = "01" + currentTimeStr + hash;
	return token;
};

export const createGeneralToken = (params, currentTime, version) => {
	let finalString = "";

	// Add string, separating with :. On last item, dont add :.
	params.forEach((el, i) => {
		if (i === params.length - 1) {
			finalString += el;
		} else {
			// we add : for all element except the last one
			finalString += `${el}:`;
		}
	});

	const signature = crypto.createHash("md5").update(finalString).digest("hex");

	let x = version ? version : "05";

	return x + currentTime + signature;
};

export const createSubOrgToken = (
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
) => {
	const currentTimeStr = getCurrentTime();

	let arg =
		"" +
		organizationId +
		":" +
		accountType +
		":" +
		name +
		":" +
		countryId +
		":" +
		regionId +
		":" +
		postalCode +
		":" +
		cityName +
		":" +
		phoneNumber +
		":" +
		emailAddress +
		":" +
		currentTimeStr +
		":" +
		key;

	const signature = crypto.createHash("md5").update(arg).digest("hex");
	let f = "02" + currentTimeStr + signature;
	return f;
};

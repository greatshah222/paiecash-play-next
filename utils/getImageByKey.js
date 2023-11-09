import defaultClubLogo from "../constants/assets/images/defaultImage/salibandytv_default_logo.png";

const images = {
	defaultClubLogo,
};

const getImageByKey = (key) => {
	return images[key];
};

export { getImageByKey };

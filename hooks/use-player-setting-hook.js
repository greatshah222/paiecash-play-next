import { useReducer } from "react";
import { removeHexColorSymbol } from "../lib/removeHexColorSymbol";
import { getImageBaseRoute } from "@/lib/getBaseRoute";

const playerConfigReducer = (state, action) => {
	const { payload, type } = action;

	return {
		...state,
		[type]: payload,
	};
};

export const usePlayerSetting = () => {
	const initialState = {
		skin: "s1",
		skinBackgroundColor: "rgba(188, 122, 249, 1)",
		skinButtonColor: "rgba(255, 255, 255, 1)",
		// speed is true by default -<rn we dont have any API that gives us this property
		speed: true,
		automaticFullscreenOnLandscape: false,
		ads: false,

		autoplay: true,

		sharing: false,
		logo: "",
		logoPosition: "",
		logoLoc: "",
		logoWatermark: false,
		// 16/9 aspect ratio
		autoHeightModeRatio: 1.7777777778,

		// width and height does not matter in case of embed player -> we set it to 100% by default
		width: "640px",
		height: "360px",
		// baackground for the whole page
		playerbackgroundImage:
			"https://icareus-cache.secure2.footprint.net/paiecashplay/players/loading.svg",

		// containerbackgroundImage means poster image
		containerbackgroundImage: "",
		// set them true by default ->in suite it is set to true
		allowAnalyticsCookies: true,
		sendAnalytics: true,
		licenseKey: "",
	};

	const [state, dispatch] = useReducer(playerConfigReducer, initialState);

	const getPlayerSetting = async (playerConfig) => {
		dispatch({
			type: "licenseKey",
			payload: "Kl8lc3k9b3Y4MDJ5ZWk/cm9tNWRhc2lzMzBkYjBBJV8q",
			// payload: "Kl8lMD1jcys9a3o2Mjc5P3JvbTVkYXNpczMwZGIwQSVfKg==",
		});
		// skin
		let curSkin = playerConfig?.items?.find((el) => el.title === "skin")?.value;

		dispatch({ type: "skin", payload: curSkin ? curSkin : "s1" });

		// skin background color

		let curSkinBacgroundColor = playerConfig?.items?.find(
			(el) => el.title === "skin-background-color"
		)?.value;

		curSkinBacgroundColor = removeHexColorSymbol(curSkinBacgroundColor);

		curSkinBacgroundColor &&
			dispatch({
				type: "skinBackgroundColor",
				payload: curSkinBacgroundColor,
			});

		// skin button color

		let curSkinButtonColor = playerConfig?.items?.find(
			(el) => el.title === "skin-button-color"
		)?.value;
		curSkinButtonColor = removeHexColorSymbol(curSkinButtonColor);
		curSkinBacgroundColor &&
			dispatch({
				type: "skinButtonColor",
				payload: curSkinButtonColor,
			});

		// skin accent color

		let curSkinAccentColor = playerConfig?.items?.find(
			(el) => el.title === "skin-accent-color"
		)?.value;
		curSkinAccentColor = removeHexColorSymbol(curSkinAccentColor);
		curSkinAccentColor &&
			dispatch({
				type: "skinAccentColor",
				payload: curSkinAccentColor,
			});

		// logo ->url

		// logo and its position starts here
		let curLogo = playerConfig?.items?.find((el) => el.title === "player-logo-image")?.value;

		// curLogo just gives the image id and we have to prefix it also remember to add this extension .png to make it work
		curLogo &&
			dispatch({
				type: "logo",
				payload: `${getImageBaseRoute}/image/image_gallery?img_id=${curLogo}&extension=.png`,
				// payload: `https://my.icareus.com/image/image_gallery?img_id=6919203&extension=.png`,
				// https://my.icareus.com/image/image_gallery?img_id=5854002
			});
		let curLogoPosition = playerConfig?.items?.find((el) => el.title === "logo-position")?.value;

		if (curLogoPosition || curLogoPosition * 1 === 0) {
			// their value are 0 ->3 and we need to find exact string based on array present insidee
			let curLogoPositionName = playerConfig?.items
				?.find((el) => el.title === "logo-position")
				.options.find((el1) => el1.value * 1 === curLogoPosition * 1)?.name;

			// logo postion from our API is not correct based on RMP docs
			const locationArray = {
				"Top-Left": "topleft",
				"Top-Right": "topright",
				"Bottom-Left": "bottomleft",
				"Bottom-Right": "bottomright",
			};
			curLogoPositionName = locationArray[curLogoPositionName];

			// logo position
			curLogoPositionName &&
				dispatch({
					type: "logoPosition",
					payload: curLogoPositionName,
				});

			// what happens when logo is clicked
			if (curLogo) {
				// this means logo is present now we find the url what happends when logo is clicked->URL to open when logo is clicked"
				let curLogoLoc = playerConfig?.items?.find(
					(el) => el.title === "player-logo-location"
				)?.value;
				curLogoLoc &&
					dispatch({
						type: "logoLoc",
						payload: curLogoLoc,
					});

				// also logo water mark ->If selected, the logo image will not auto-hide with the control bar"
				let logoWatermark = playerConfig?.items?.find(
					(el) => el.title === "player-logo-watermark"
				)?.value;

				curLogoLoc &&
					dispatch({
						type: "logoWatermark",
						payload: logoWatermark,
					});
			}
		}

		// logo and its position ends here

		// aspect ration
		let aspectRatio = playerConfig?.items?.find((el) => el.title === "aspect-ratio")?.value;
		if (aspectRatio) {
			let dimensions = aspectRatio.split(":");
			let width = dimensions[0];
			let height = dimensions[1];
			aspectRatio = width / height;
			aspectRatio &&
				dispatch({
					type: "autoHeightModeRatio",
					payload: aspectRatio,
				});
		}

		// width
		let curWidth = playerConfig?.items?.find((el) => el.title === "width")?.value;
		if (curWidth) {
			curWidth &&
				dispatch({
					type: "width",
					payload: curWidth,
				});
		}
		let curHeight = playerConfig?.items?.find((el) => el.title === "height")?.value;
		if (curHeight) {
			curHeight &&
				dispatch({
					type: "height",
					payload: curHeight,
				});
		}
		// player background image means they will be used as the background image -<load it all the time

		let playerbackgroundImage = playerConfig?.items?.find(
			(el) => el.title === "player-background-image"
		)?.value;
		if (playerbackgroundImage) {
			playerbackgroundImage &&
				dispatch({
					type: "playerbackgroundImage",
					// payload: playerbackgroundImage,
					payload: `${getImageBaseRoute}/image/image_gallery?img_id=${playerbackgroundImage}&extension=.png`,
				});
		}

		// conatainer backgound image(poster image)

		let containerbackgroundImage = playerConfig?.items?.find(
			(el) => el.title === "container-background-image"
		)?.value;
		if (containerbackgroundImage) {
			containerbackgroundImage &&
				dispatch({
					type: "containerbackgroundImage",
					// payload: containerbackgroundImage,
					payload: `${getImageBaseRoute}/image/image_gallery?img_id=${containerbackgroundImage}&extension=.png`,
				});
		}

		let playerShareButton = playerConfig?.items?.find(
			(el) => el.title === "player-share-buttons"
		)?.value;

		// sharing is false by default and when available it will be changed to true
		if (playerShareButton) {
			playerShareButton &&
				dispatch({
					type: "sharing",
					// payload: playerbackgroundImage,
					payload: playerShareButton,
				});
		}

		let curAllowAnalyticsCookie = playerConfig?.items?.find(
			(el) => el.title === "allow-analytics-cookies"
		)?.value;
		// curAllowAnalytics can be false so dont check for its existence

		dispatch({
			type: "allowAnalyticsCookies",
			payload: curAllowAnalyticsCookie,
		});
		// to send or not the analytics

		let cursendAnalytics = playerConfig?.items?.find((el) => el.title === "send-analytics")?.value;
		// curAllowAnalytics can be false so dont check for its existence

		dispatch({
			type: "sendAnalytics",
			payload: cursendAnalytics,
		});
		return state;
	};

	return [state, getPlayerSetting];
};

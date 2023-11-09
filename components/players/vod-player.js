import { useSession } from "next-auth/react";
import { useCookies } from "react-cookie";
import { useEffect, useRef, useState } from "react";

import useWindowDimensions from "@/hooks/use-window-dimension";
import { usePlayerSetting } from "@/hooks/use-player-setting-hook";
import Translations from "../Translations";
import AppConfig from "@/config";

const VodPlayer = ({
	asset,
	playerConfig,
	assetToken,
	organizationId,
	groupId,
	allCampaigns,
	host,
}) => {
	const session = useSession();
	const dimension = useWindowDimensions();

	const [cookies, setCookie, removeCookie] = useCookies(["vodCampaign"]);

	const rmpPlayer = useRef();

	const [loading, setLoading] = useState(true);
	const [radiantMediaPlayerObject, setRadiantMediaPlayerObject] = useState(null);

	const [campaingId, setCampaingId] = useState(null);

	const [state, getPlayerSetting] = usePlayerSetting();

	console.log("allCampaigns,", allCampaigns);

	useEffect(() => {
		if (
			playerConfig &&
			organizationId &&
			groupId &&
			rmpPlayer.current &&
			session?.status !== "loading"
		) {
			setLoading(true);
			getPlayerSetting(playerConfig, host);

			setLoading(false);
			// checking for campaignId
			if (allCampaigns?.campaigns?.length > 0) {
				let unusedCampaigns = allCampaigns?.campaigns.filter(
					(el) => !cookies?.vodCampaign?.includes(el?.campaignId)
				);
				if (unusedCampaigns?.length > 0) {
					setCampaingId(unusedCampaigns[0].campaignId);
					let curCookie = cookies?.vodCampaign;
					if (!curCookie) curCookie = [];
					setCookie("vodCampaign", [...curCookie, unusedCampaigns[0].campaignId], {
						path: "/",
						Secure: true,
						SameSite: "none",
					});
				} else {
					// this means all campaign have already been shown
					removeCookie("vodCampaign", {
						path: "/",
						Secure: true,
						SameSite: "none",
					});
					// show the first campaign again
					setCampaingId(allCampaigns?.campaigns[0].campaignId);
					setCookie("vodCampaign", [allCampaigns?.campaigns[0].campaignId], {
						path: "/",
						Secure: true,
						SameSite: "none",
					});
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerConfig, organizationId, groupId, allCampaigns?.campaigns, session?.status]);

	useEffect(() => {
		let radiantscript, vodjs, advertjs;

		if (!loading) {
			const createScript = () => {
				radiantscript = document.createElement("script");
				vodjs = document.createElement("script");
				advertjs = document.createElement("script");

				vodjs.id = "vodjs";

				radiantscript.src = "https://cdn.radiantmediatechs.com/rmp/9.6.6/js/rmp.min.js";

				vodjs.src = "https://staging1.icareus.com/lib/js/players/v4/players/vodUpdated.js";
				advertjs.src = "https://staging1.icareus.com/lib/js/players/v3/players/adverts.js"; // adverts1 is for beta

				vodjs.async = true;
				advertjs.async = true;
				radiantscript.async = true;

				document.body.appendChild(radiantscript);
				document.body.appendChild(vodjs);
				document.body.appendChild(advertjs);
			};

			createScript();

			let customErrorMessage = <Translations text="players.customErrorMessage" />;
			let noSupportMessage = <Translations text="players.noSupportMessage" />;
			let noSupportDownload = <Translations text="players.noSupportDownload" />;
			let noSupportInstallChrome = <Translations text="players.noSupportInstallChrome" />;
			let noSupportInstallChromeLink = <Translations text="players.noSupportInstallChromeLink" />;
			const labels = {
				error: {
					customErrorMessage,
					noSupportMessage,
					noSupportDownload,
					noSupportInstallChrome,
					noSupportInstallChromeLink,
				},
			};

			window._icareus = {};

			window._icareus.companyId = "10154";

			window._icareus.groupId = groupId;

			window._icareus.organizationId = organizationId;

			window._icareus.itemId = asset;
			window._icareus.userId = session?.data?.user?.user_id;

			window._icareus.host = "https://api.icareus.com";
			window._icareus.playerId = "rmpPlayer";
			window._icareus.playerType = "radiant";
			window._icareus.playerSetup = "vodJSCallback";
			window._icareus.playerAutoStart = true;

			// disable/enable analytics cookie
			window._icareus.allowAnalyticsCookies = state.allowAnalyticsCookies;
			// disable/enable analytics

			window._icareus.sendAnalytics = state.sendAnalytics;

			window._icareus.applicationTypeId = 1;
			window._icareus.applicationId = 1;

			window._icareus.token = assetToken;

			window._icareus.initializedByReactApps = true;

			// adverts start ->only show when cookies are allowed
			window._icareus.campaignId = campaingId;
			window._icareus.advertVOD = campaingId ? true : false;
			window._icareus.useAdvertsLibrary = campaingId ? true : false;

			// adverts end

			let settings;

			// Then we define a custom module - in this case close button
			const customModule = [];

			window.vodJSCallback = function () {
				settings = {
					labels: labels,
					detectViewerLanguage: false,

					licenseKey: state.licenseKey,
					src: window._icareus.sources,
					ccFiles: window._icareus.subtitles,

					width: state.width,
					height: state.height,
					// if autoHeightMode is true -<width is set to 100% and height adjusted accordingly

					autoHeightMode: true,
					autoHeightModeRatio: state.autoHeightModeRatio,

					// The 4 player skins ('s1', 's2', 'outstream', 'tv') can easily be colorized using the following player settings.
					skin: state.skin,
					// This setting will colorize the background of the skin. Default to ''.

					skinBackgroundColor: state.skinBackgroundColor,
					skinButtonColor: state.skinButtonColor,
					skinAccentColor: state.skinAccentColor,

					speed: state.speed,
					automaticFullscreenOnLandscape: state.automaticFullscreenOnLandscape,
					sharing: state.sharing,
					autoplay: state.autoplay,

					// logo start

					logo: state.logo,

					logoPosition: state.logoPosition,
					logoLoc: state.logoLoc,

					logoWatermark: state.logoWatermark,
					// logo ends
					// allowLocalStorage: false,

					adTagUrl: window._icareus.videoVastURL,
					ads: campaingId ? true : false,

					contentMetadata: {
						poster: [
							state.containerbackgroundImage
								? state.containerbackgroundImage
								: window._icareus.thumbnail,
						],
					},

					customModule: customModule,

					// preload auto will load more video chunks
					preload: "auto",

					asyncElementID: rmpPlayer.current.id,
					ccFontSize: dimension?.width > 1620 ? 3 : dimension?.width > 599 ? 1.75 : 1,
				};

				// when ready event fires we append our custom overlay div element
				// so that this element is appended on top of other player elements
				window._icareus.playerObject.init({ ...settings });
				setRadiantMediaPlayerObject(window._icareus.playerObject);
			};
			return () => {
				// pausing the rmp
				radiantMediaPlayerObject?.pause();
				// muting the rmp
				radiantMediaPlayerObject?.setMute(true);
				// destroying the rmp
				radiantMediaPlayerObject?.destroy();
				document.body.removeChild(radiantscript);
				document.body.removeChild(vodjs);
				document.body.removeChild(advertjs);
				setRadiantMediaPlayerObject(null);
			};
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	return (
		<div
			style={{
				backgroundImage: `url(${state.playerbackgroundImage})`,
			}}
			className={""}
			ref={rmpPlayer}
			id="rmpPlayer"
		></div>
	);
};

export default VodPlayer;

import { usePlayerSetting } from "@/hooks/use-player-setting-hook";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Translations from "../Translations";
import { createAssetIdToken } from "@/lib/tokenCreation";
import AppConfig from "@/config";

const { detect } = require("detect-browser");

export default function LivePlayer({
	channelServiceId,
	organizationId,
	playerConfig,
	groupId,
	secret,
	eventId,
}) {
	const [loading, setLoading] = useState(true);
	const [radiantMediaPlayerObject, setRadiantMediaPlayerObject] = useState(null);

	const rmpPlayer = useRef();
	const browser = detect();
	const session = useSession();

	const [state, getPlayerSetting] = usePlayerSetting();

	useEffect(() => {
		if (
			playerConfig &&
			organizationId &&
			groupId &&
			rmpPlayer.current &&
			session?.status !== "loading" &&
			channelServiceId
		) {
			setLoading(true);
			getPlayerSetting(playerConfig);

			setLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerConfig, organizationId, groupId, session?.status, channelServiceId]);

	useEffect(() => {
		if (!loading) {
			let radiantscript, liveScript, eventScript;

			// no need vod.js for live event/video
			// need to load both live.js and event script for events which are  live
			const createScript = () => {
				radiantscript = document.createElement("script");
				liveScript = document.createElement("script");
				eventScript = document.createElement("script");

				radiantscript.src = "https://cdn.radiantmediatechs.com/rmp/8.4.0/js/rmp.min.js";

				liveScript.src = "https://staging1.icareus.com/lib/js/players/v3/players/live.js";
				eventScript.src = "https://staging1.icareus.com/lib/js/players/v1/players/events.js";

				liveScript.id = "livejs";
				radiantscript.id = "radiantLive";
				eventScript.id = "eventLive";

				eventScript.async = true;
				liveScript.async = true;
				radiantscript.async = true;

				document.body.appendChild(radiantscript);
				document.body.appendChild(liveScript);

				document.body.appendChild(eventScript);
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
			// itemID and serviceId is same and it must be passed
			window._icareus.itemId = channelServiceId;
			window._icareus.serviceId = channelServiceId;
			window._icareus.host = "https://api.icareus.com";

			window._icareus.playerId = "rmpLivePlayer";
			window._icareus.playerType = "radiant";
			window._icareus.playerSetup = "startOnDemandPlayer";
			window._icareus.playerAutoStart = true;
			window._icareus.userId = session?.data?.user?.user_id;
			window._icareus.licenseFileUrl =
				"//icareus-cache.secure2.footprint.net/suite/radiantplayerlicenses.json";
			window._icareus.streamRootKeysUrl =
				"//icareus-cache.secure2.footprint.net/suite/streamrootkeys.json";

			window._icareus.token = createAssetIdToken(organizationId, channelServiceId, false, secret);

			const customModule = [];

			let settings;
			function functionOne(_callback) {
				window._icareus.eventIdActual = eventId;
				// assetID should always be 0 wheen it is live event
				window._icareus.assetId = 0;
				window.EVENT_ANALYTICS.init();
				_callback();
			}

			// please pass the param maxMaxBufferLength and set it to 120 (default is 600) ->usman comments

			const hlsJSCustomConfig = {
				maxMaxBufferLength: 60,
			};

			window.startOnDemandPlayer = function () {
				settings = {
					licenseKey: state.licenseKey,

					src: window._icareus.sources,

					autoHeightMode: true,
					autoHeightModeRatio: state.autoHeightModeRatio,
					skin: state.skin,

					skinBackgroundColor: state.skinBackgroundColor,
					skinButtonColor: state.skinButtonColor,
					skinAccentColor: state.skinAccentColor,

					automaticFullscreenOnLandscape: state.automaticFullscreenOnLandscape,

					// custom message to player
					labels: labels,
					detectViewerLanguage: false,
					// end of custom message

					customModule: customModule,

					// custom data for hls ->given by usman

					hlsJSCustomConfig: hlsJSCustomConfig,

					preload: "auto",

					asyncElementID: rmpPlayer?.current.id,
				};

				window._icareus.playerObject.init(settings);
				setRadiantMediaPlayerObject(window._icareus.playerObject);

				// we need to send event analytics after we have sent live analytics so this functionOne should be invoked at the end

				functionOne(() => {});
			};
			setTimeout(() => {
				setLoading(false);
			}, 1000);
			return () => {
				// pausing the rmp
				radiantMediaPlayerObject?.pause();
				// muting the rmp
				radiantMediaPlayerObject?.setMute(true);
				// destroying the rmp
				radiantMediaPlayerObject?.destroy();
				document.body.removeChild(radiantscript);
				document.body.removeChild(liveScript);
				document.body.removeChild(eventScript);
				setRadiantMediaPlayerObject(null);
			};
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	return (
		<>
			<div>
				<div ref={rmpPlayer} id="rmpLivePlayer"></div>
			</div>
			{loading && <div className="display-flex-center"></div>}
		</>
	);
}

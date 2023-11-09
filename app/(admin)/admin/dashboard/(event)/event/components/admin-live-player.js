"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import LivePlayer from "@/components/players/live-player";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScoreboardTeamDialog } from "./scoreboard-team-dialog";
import { scoreBoardHandler } from "@/utils/datahandler";
import Translations from "@/components/Translations";

import Scoreboard from "./scoreboard";

const AdminLivePlayer = ({
	channelServiceId,
	organizationId,
	groupId,
	secret,
	eventId,
	isAlreadyInitiated,
	currentStreamScoreboardParams,
	event,
	token,
	gameId,
}) => {
	const { t } = useTranslation();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onOpenChange = () => {
		setOpen(false);
	};

	const clickHandler = async (val) => {
		try {
			setIsLoading(true);
			const data = {
				streamName: channelServiceId,
				enable: true,
				scoreboardSecondTeam: val.awayteamName,

				scoreboardFirstTeam: val.hometeamName,

				scoreboardImage: "scoreboard.png",
				scoreboardImageLocation: "10,0",
				scoreboardFirstTeamLocation: "5,10",
				scoreboardSecondTeamLocation: "240,10",
				scoreboardPeriodLocation: "235,35",
				scoreboardScoreLocation: "175,10",
				scoreboardTimerLocation: "170,35",
				scoreboardFontColor: "#ffffff",
				scoreboardFontSize: "18",
				scoreboardTeamFontColor: "#161b55",

				// font
				font: "Heading Pro Treble",
				// pass this as true so it will be given in the response later
				scoreboardShowScore: true,
				// we will pass gameId here
				lowerThirdText: gameId,
			};
			const res1 = await scoreBoardHandler(data, token);
			if (res1?.data?.status === "ok") {
				router.refresh(); // this is important
			} else {
				toast.error(t(`scoreboard.noStreamingBeforeScoreboardError`));
			}
		} catch (error) {
			toast.error(t(`scoreboard.noStreamingBeforeScoreboardError`));
			console.log("error", error);
		} finally {
			setIsLoading(false);
			setOpen(false);
		}
	};
	return (
		<div>
			<ScoreboardTeamDialog
				open={open}
				onOpenChange={onOpenChange}
				setOpen={setOpen}
				event={event}
				clickHandler={clickHandler}
				isLoading={isLoading}
			/>
			<div
				className={cn(
					"grid grid-cols-1 md:grid-cols-2  my-5 gap-2",

					!isAlreadyInitiated && "md:grid-cols-1 w-full md:w-[80%]"
				)}
			>
				<LivePlayer
					eventId={eventId}
					organizationId={organizationId}
					channelServiceId={channelServiceId}
					playerConfig={{}}
					groupId={groupId}
					secret={secret}
				/>

				{isAlreadyInitiated ? (
					<Scoreboard
						currentStreamScoreboardParams={currentStreamScoreboardParams}
						token={token}
						serviceId={channelServiceId}
						event={event}
					/>
				) : (
					<div className="flex justify-end items-center">
						<Button onClick={() => setOpen(true)} className="w-full">
							<Translations text="scoreboard.useScoreboard" />
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminLivePlayer;

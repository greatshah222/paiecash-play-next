"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import Translations from "@/components/Translations";

export function ScoreboardTeamDialog({ open, onOpenChange, clickHandler, event, isLoading }) {
	const [hometeamName, setHometeamName] = useState(event?.homeTeamName);
	const [awayteamName, setAwayteamName] = useState(event?.awayTeamName);
	return (
		<Modal
			isOpen={open}
			onClose={onOpenChange}
			className={"text-black"}
			title={<Translations text="scoreboard.confirmTeamName" />}
			description={<Translations text="scoreboard.teamNameDisplayedScoreboard" />}
		>
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="hometeam" className="text-right">
						<Translations text="scoreboard.homeTeam" />
					</Label>
					<Input
						id="hometeamName"
						value={hometeamName}
						onChange={({ target }) => setHometeamName(target.value)}
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="awayteam" className="text-right">
						<Translations text="scoreboard.awayTeam" />
					</Label>
					<Input
						id="awayteamName"
						value={awayteamName}
						onChange={({ target }) => setAwayteamName(target.value)}
						className="col-span-3"
					/>
				</div>
			</div>
			<Button
				type="submit"
				disabled={!hometeamName || !awayteamName || isLoading}
				onClick={() =>
					clickHandler({
						hometeamName,
						awayteamName,
					})
				}
			>
				{isLoading ? <Translations text="shared.loading" /> : <Translations text="shared.save" />}
			</Button>
		</Modal>
	);
}

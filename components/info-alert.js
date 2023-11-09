"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import Translations from "./Translations";

const InfoAlert = ({ text }) => {
	return (
		<Alert>
			<Info className="w-4 h-4" />

			<AlertTitle className="flex items-center gap-x-2">{"Info"}</AlertTitle>
			<AlertDescription className="mt-4 flex items-center justify-between flex-wrap gap-2">
				<code className="relative rounded  px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold overflow-auto ">
					<Translations text={text} />
				</code>
			</AlertDescription>
		</Alert>
	);
};

export default InfoAlert;

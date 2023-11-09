"use client";

import { Copy, Server } from "lucide-react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import Translations from "@/components/Translations";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const ApiAlert = ({ title, description }) => {
	const { t } = useTranslation();

	const onCopy = () => {
		navigator.clipboard.writeText(description);

		toast.success(t("event.copiedToClipboard"));
	};

	return (
		<Alert>
			<Server className="w-4 h-4" />

			<AlertTitle className="flex items-center gap-x-2">
				{<Translations text={`${title}`} />}
			</AlertTitle>
			<AlertDescription className="mt-4 flex items-center justify-between flex-wrap gap-2">
				<code className="relative rounded  px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold overflow-auto ">
					{description}
				</code>

				<Button variant={"outline"} size={"icon"} onClick={onCopy}>
					<Copy className="w-4 h-4" />
				</Button>
			</AlertDescription>
		</Alert>
	);
};

export default ApiAlert;

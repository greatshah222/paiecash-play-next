"use client";
import { Euro } from "lucide-react";

import Translations from "@/components/Translations";
import Header from "@/components/ui/Header/header";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMyContext } from "@/context/StateHolder";

const SubscriptionsPageClient = ({ data, title }) => {
	const { initialLanguageLoaded } = useMyContext();

	if (!initialLanguageLoaded) return null;
	return (
		<>
			<div className="px-4 md:px-20 lg:px-32 space-y-4">
				<Header className="mb-6" title={<Translations text={title} />} />

				{data?.length === 0 ? (
					<>
						<Card className="p-4 border-black/5 flex items-center justify-center hover:shadow-md transition cursor-pointer text-center ">
							<Translations text="userprofile.subscriptions.nosubscription" />
						</Card>
					</>
				) : (
					data.map((el) => (
						<Card
							key={el.href}
							className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer "
						>
							<div className="flex items-center gap-x-4">
								<div className={cn("p-2 w-fit rounded-md")}></div>

								<div className="font-semibold">{el?.productName || el?.name}</div>
							</div>
							{el?.price && (
								<div className="flex gap-1 justify-center items-center ">
									<Euro className="w-4 h-4 text-muted-foreground" />
									<div className="font-bold text-muted-foreground">{el?.price}</div>
								</div>
							)}
						</Card>
					))
				)}
			</div>
		</>
	);
};

export default SubscriptionsPageClient;

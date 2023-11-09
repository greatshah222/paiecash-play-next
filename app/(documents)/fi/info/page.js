"use client";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

import Container from "@/components/ui/container";
import InfoFinnish from "@/components/info/info-fi";

const FinnishInfoPage = () => {
	const { i18n } = useTranslation();
	const router = useRouter();

	useEffect(() => {
		if (i18n?.language == "en") {
			router.push(`/en/info`);
		}
	}, [i18n?.language, router]);

	return (
		<div className="bg-white">
			<Container className={"bg-white"}>
				<InfoFinnish />
			</Container>
		</div>
	);
};

export default FinnishInfoPage;

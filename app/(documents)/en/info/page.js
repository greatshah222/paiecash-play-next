"use client";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

import Container from "@/components/ui/container";
import InfoEnglish from "@/components/info/info-en";

const EnglishInfoPage = () => {
	const { i18n } = useTranslation();
	const router = useRouter();

	useEffect(() => {
		if (i18n?.language == "fi") {
			router.push(`/fi/info`);
		}
	}, [i18n?.language, router]);

	return (
		<div className="bg-white">
			<Container className={"bg-white"}>
				<InfoEnglish />
			</Container>
		</div>
	);
};

export default EnglishInfoPage;

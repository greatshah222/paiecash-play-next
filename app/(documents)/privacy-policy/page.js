"use client";

import Container from "@/components/ui/container";
import PrivacyPolicyClient from "./components/privacy-policy-client";

const EnglishTosPage = () => {
	return (
		<div className="bg-white">
			<Container className={"bg-white"}>
				<PrivacyPolicyClient />
			</Container>
		</div>
	);
};

export default EnglishTosPage;

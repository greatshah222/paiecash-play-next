"use client";
import Lottie from "lottie-react";

import AdminContainer from "@/components/admin-container";
import error from "@/constants/assets/images/lottie/event-error.json";

// event-error

export const metadata = {
	title: "Error-something went wrong",
	description: "Error-something went wrong",
};

const ErrorMain = () => {
	return (
		<div className="bg-white h-full">
			<AdminContainer className={"h-full bg-white"}>
				<Lottie animationData={error} loop={true} style={{ height: "80vh" }} />
			</AdminContainer>
		</div>
	);
};

export default ErrorMain;

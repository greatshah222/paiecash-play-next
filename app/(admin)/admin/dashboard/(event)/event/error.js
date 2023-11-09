"use client";
import Lottie from "lottie-react";

import AdminContainer from "@/components/admin-container";
import error from "@/constants/assets/images/lottie/event-error.json";

// event-error

const ErrorEventAdminPage = () => {
	return (
		<div className="bg-white h-full">
			<AdminContainer className={"h-full bg-white"}>
				<Lottie animationData={error} loop={true} style={{ height: "80vh" }} />
			</AdminContainer>
		</div>
	);
};

export default ErrorEventAdminPage;

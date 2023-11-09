"use client";
import Lottie from "lottie-react";

import loading from "@/constants/assets/images/lottie/loading.json";
import AdminContainer from "@/components/admin-container";

const Loading = () => {
	// TODO NEED SOMETHING HERE
	return (
		<div className={"bg-white h-full w-full "}>
			<AdminContainer>
				<Lottie animationData={loading} loop={true} style={{ height: "100vh" }} />
			</AdminContainer>
		</div>
	);
};

export default Loading;

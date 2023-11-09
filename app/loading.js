"use client";
import Lottie from "lottie-react";

import loading from "@/constants/assets/images/lottie/loading.json";

const Loading = () => {
	// TODO NEED SOMETHING HERE
	return (
		<div className={"bg-white w-full h-full min-h-screen "}>
			<Lottie animationData={loading} loop={true} style={{ height: "100vh" }} />
		</div>
	);
};

export default Loading;

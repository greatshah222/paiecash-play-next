"use client";

import Image from "next/image";
import { useState } from "react";

const ClubBanner = ({ orgId, organizationName }) => {
	/// TODO CHANGE SRC TO USE CDN
	const [src, setSrc] = useState(
		`https://icareus-cache.secure2.footprint.net/salibandytv/banners/${orgId}.jpg`
	);

	return (
		<div className="w-full sm:w-[94%] p-5 sm:p-10 lg:max-w-[1600px] m-auto ">
			<Image
				src={src}
				onError={() =>
					setSrc("https://icareus-cache.secure2.footprint.net/salibandytv/banners/default.jpg")
				}
				width={1920}
				height={520}
				className="aspect-video w-[100vw] md:aspect-auto m-auto pt-[80px]"
				alt=""
			/>
			<div className="bg-white h-15 sm:h-20 w-full text-brand text-4xl text-center py-4">
				{decodeURIComponent(organizationName)}
			</div>
		</div>
	);
};

export default ClubBanner;

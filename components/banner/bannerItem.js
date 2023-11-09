"use client";

import Image from "next/image";
import BannerCustomCarousel from "../ui/BannerCarousel";

const BannerItem = ({ data }) => {
	const onClickHandler = (item) => {
		if (item.pageUrl) {
			window.location.href = item?.pageUrl;
		} else return;
	};
	return (
		<>
			<BannerCustomCarousel>
				{data?.map((el) => {
					return (
						<div
							key={el?.id}
							href={"/events"}
							target="_blank"
							className="z-50 hover:cursor-pointer"
							onClick={() => onClickHandler(el)}
						>
							<Image
								src={el?.bannerImageLarge || el?.bannerImageMedium || el?.bannerImageSmall}
								key={el?.id}
								width="1920"
								height="1080"
								className="aspect-video"
								alt={"home-banner"}
								onClick={() => onClickHandler(el)}
								placeholder="blur"
								blurDataURL="data:image/webp;base64,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"
							/>
						</div>
					);
				})}
			</BannerCustomCarousel>
		</>
	);
};

export default BannerItem;

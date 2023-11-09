import CustomCarousel from "../CustomCarousel";
import { SwiperSlide } from "swiper/react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import Colors from "@/constants/assets/colors";

const EventCarouselSkeleton = () => {
	const items = [...Array(10).keys()];
	return (
		<CustomCarousel hideArrow>
			{items.map((el) => (
				<SwiperSlide key={el}>
					<SkeletonTheme>
						<p>
							<Skeleton
								width={"100%"}
								height={"200px"}
								style={{
									borderRadius: "16px",
									maxWidth: "300px",
								}}
							/>
						</p>

						<p>
							<Skeleton
								width={"100%"}
								height={"30px"}
								style={{
									maxWidth: "300px",
								}}
							/>
						</p>
					</SkeletonTheme>
				</SwiperSlide>
			))}
		</CustomCarousel>
	);
};

export default EventCarouselSkeleton;

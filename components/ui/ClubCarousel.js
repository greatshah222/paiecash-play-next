"use client";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

const ClubCarousel = ({ children, hideArrow }) => {
	return (
		<Swiper
			spaceBetween={10}
			freeMode
			breakpoints={{
				// when window width is >= 549px

				0: {
					slidesPerView: 2.4,
				},
				650: {
					slidesPerView: 3.4,
				},

				// when window width is >= 640px
				860: {
					slidesPerView: 3.4,
				},
				949: {
					slidesPerView: 4.4,
				},
				1199: {
					slidesPerView: 4.4,
				},

				1399: {
					slidesPerView: 5.4,
				},
				1599: {
					slidesPerView: 6.4,
				},
			}}
			navigation={!hideArrow}
			modules={[Navigation]}
		>
			{children}
		</Swiper>
	);
};

export default ClubCarousel;

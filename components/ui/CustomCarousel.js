"use client";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

const CustomCarousel = ({ children, hideArrow }) => {
	return (
		<Swiper
			spaceBetween={20}
			freeMode
			breakpoints={{
				// when window width is >= 549px

				0: {
					slidesPerView: 1.4,
					// spaceBetween: 40,
				},

				650: {
					slidesPerView: 2.4,
					// spaceBetween: 40,
				},

				// when window width is >= 640px
				860: {
					slidesPerView: 2.4,
				},
				949: {
					slidesPerView: 2.4,
				},
				1199: {
					slidesPerView: 4.4,
				},
			}}
			navigation={!hideArrow}
			modules={[Navigation]}
			effect="fade"
		>
			{children}
		</Swiper>
	);
};

export default CustomCarousel;

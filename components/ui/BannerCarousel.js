"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from "react-responsive-carousel";

const slickSettings = {
	dots: false,
	infiniteLoop: true,

	responsive: {
		desktop: {
			breakpoint: {
				max: 4000,
				min: 1441,
			},
			items: 1,
			partialVisibilityGutter: 0,
			slidesToSlide: 1,
		},
		laptop: {
			breakpoint: {
				max: 1440,
				min: 769,
			},
			items: 1,
			partialVisibilityGutter: 0,
			slidesToSlide: 1,
		},

		tablet: {
			breakpoint: {
				max: 768,
				min: 550,
			},
			items: 1,
			partialVisibilityGutter: 0,
			slidesToSlide: 1,
		},
		mobile: {
			breakpoint: {
				max: 549,
				min: 0,
			},
			items: 1,
			partialVisibilityGutter: 0,
			slidesToSlide: 1,
		},
	},

	showStatus: false,
	showThumbs: false,
	autoPlay: true,
	interval: 3000,
};

const BannerCustomCarousel = ({ children }) => {
	return <Carousel {...slickSettings}>{children}</Carousel>;
};

export default BannerCustomCarousel;

"use client";

import Container from "@/components/ui/container";
import EventCarouselSkeleton from "@/components/ui/loading/event-carousel-loading";

const Loading = () => {
	return (
		<Container>
			<EventCarouselSkeleton />
		</Container>
	);
};

export default Loading;

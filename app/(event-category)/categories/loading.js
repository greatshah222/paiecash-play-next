import Container from "@/components/ui/container";
import EventGridSkeleton from "@/components/ui/loading/event-grid-loading";

const Loading = () => {
	return (
		<div className="bg-white w-full h-full">
			<Container>
				<EventGridSkeleton />
			</Container>
		</div>
	);
};

export default Loading;

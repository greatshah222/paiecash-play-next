import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<div className="bg-white w-full h-full min-h-[200vh]">
			<Container className={"min-h-[200vh] h-full"}>
				<div className="flex items-center space-y-4 flex-col  w-[60%] mx-auto ">
					<Skeleton className="h-auto aspect-video w-full " />
					<div className="space-y-2 w-full">
						<Skeleton className="h-4 w-[60%] " />
						<Skeleton className="h-4 w-[60%] " />
						<Skeleton className="h-4 w-[40%] " />
					</div>
					<div className="space-y-2 w-full">
						<Skeleton className="h-4 w-[60%]" />
						<Skeleton className="h-4 w-[60%] " />
						<Skeleton className="h-4 w-[40%] " />
					</div>
					<div className="space-y-2 w-full">
						<Skeleton className="h-4 w-[60%]" />
						<Skeleton className="h-4 w-[60%] " />
						<Skeleton className="h-4 w-[40%] " />
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Loading;

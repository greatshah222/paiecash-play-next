import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

const PackageLoading = () => {
	return (
		<div className="bg-white w-full h-full">
			<Container>
				<div className="flex items-center space-y-4 flex-col  w-[80%] mx-auto ">
					<Skeleton className="h-[15px] w-full" />
					<Skeleton className="h-[300px] w-full" />

					<div className="grid gap-8  items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-24">
						<Skeleton className={" h-[300px] w-[300px] "} />
						<Skeleton className={" h-[300px] w-[300px]"} />
						<Skeleton className={" h-[300px] w-[300px]"} />
					</div>
				</div>
			</Container>
		</div>
	);
};

export default PackageLoading;

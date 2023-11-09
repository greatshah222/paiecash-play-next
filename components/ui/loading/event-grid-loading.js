import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const EventGridSkeleton = () => {
	const items = [...Array(20).keys()];
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
			{items.map((el) => (
				<div key={el}>
					<SkeletonTheme>
						<p>
							<Skeleton
								width={"100%"}
								height={"200px"}
								style={{
									borderRadius: "16px",
								}}
							/>
						</p>

						<p>
							<Skeleton width={"100%"} height={"30px"} />
						</p>
					</SkeletonTheme>
				</div>
			))}
		</div>
	);
};

export default EventGridSkeleton;

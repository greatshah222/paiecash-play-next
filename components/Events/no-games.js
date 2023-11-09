import { SwiperSlide } from "swiper/react";
import { Play } from "lucide-react";

import CustomCarousel from "../ui/CustomCarousel";
import Translations from "../Translations";

const NoGames = () => {
	return (
		<CustomCarousel>
			<SwiperSlide>
				<div className={"min-h-200 border border-brand rounded-md "}>
					<div
						className={
							"min-h-[150px] flex justify-around items-center rounded-md border-brand border-b-0"
						}
					>
						<div className="px-[10px] py-[10px] border border-brand rounded-full">
							<Play className="text-brand" size={15} />
						</div>
					</div>
					<div
						className={`px-2 py-3 flex text-center flex-col text-sm gap-2 h-[70px] min-h-[70px] max-h-[70px] bg-brand`}
					>
						<div></div>

						<div className={"flex gap-2 justify-center text-center"}>
							<div className="flex"></div>
							<div>
								<Translations text="events.nogames" />
							</div>
						</div>
					</div>
					<div></div>
				</div>
			</SwiperSlide>
		</CustomCarousel>
	);
};

export default NoGames;

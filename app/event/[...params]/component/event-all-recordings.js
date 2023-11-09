import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SwiperSlide } from "swiper/react";

import CustomCarousel from "@/components/ui/CustomCarousel";
import Header from "@/components/ui/Header/header";
import AppConfig from "@/config";
import { getAsset } from "@/utils/datahandler";
import Translations from "@/components/Translations";

const EventAllRecordings = ({ event, secret }) => {
	const session = useSession();
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [recrodingAssets, setRecrodingAssets] = useState(null);

	useEffect(() => {
		let allRecordingsAsset = event?.recordings?.map((el) => el?.assetId);

		const runFunction = async () => {
			let allAssets = [];

			await Promise.all(
				allRecordingsAsset.map(async (itemId) => {
					const res = await getAsset(
						event?.organizationId,
						itemId,
						secret,
						AppConfig.organization.language,
						session?.data?.user
					);
					allAssets.push(res);
				})
			);

			setRecrodingAssets(allAssets);
			setLoading(false);
		};

		runFunction();
	}, [event?.organizationId, event?.recordings, session?.data?.user, secret]);

	const clickHandler = (item) => {
		router.push(`/event/${event.organizationId}/${event.eventId}/${item?.id}`);
	};

	const data = recrodingAssets?.map((el, i) => (
		<SwiperSlide key={el?.id} onClick={() => clickHandler(el)}>
			<Image
				src={el?.thumbnailSmall}
				width={720}
				height={405}
				alt=""
				className="rounded-md hover:cursor-pointer hover:opacity-80 transition"
			/>

			<div className="my-2 flex flex-col gap-1 ">
				<div className="text-bold text-lg">
					{el?.title || el?.name} - {i + 1}
				</div>
				<div
					className="text-base text-gray-600"
					dangerouslySetInnerHTML={{ __html: el?.description }}
				></div>
			</div>
		</SwiperSlide>
	));

	return (
		!loading &&
		recrodingAssets?.length > 1 && (
			<div className="font-regular">
				<div className="mt-20 font-trebleheavy mb-10">
					<Header title={<Translations text="events.eventsRecording" />} />
				</div>

				<CustomCarousel>{data}</CustomCarousel>
			</div>
		)
	);
};

export default EventAllRecordings;

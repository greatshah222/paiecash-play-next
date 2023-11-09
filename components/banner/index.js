import { getServerSession } from "next-auth";

import AppConfig from "@/config";
import { createAssetIdToken } from "@/lib/tokenCreation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getBanner } from "@/utils/datahandler";
import BannerItem from "./bannerItem";

const Banner = async () => {
	const user = await getServerSession(authOptions);
	const token = createAssetIdToken(
		AppConfig.organization.organizationId,
		AppConfig.components.banner.groupItemId,
		null,

		AppConfig.organization.key,
		"05"
	);
	let res = await getBanner(
		AppConfig.organization.organizationId,
		AppConfig.components.banner.groupItemId,
		token,
		AppConfig.organization.language,
		user
	);

	res = res?.data?.assets.sort((a, b) => a?.name.localeCompare(b?.name, "fi-FI"));

	return (
		<div className="max-w-6xl mx-auto">
			<BannerItem data={res} />
		</div>
	);
};

export default Banner;

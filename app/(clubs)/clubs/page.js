import { getChannels } from "@/utils/datahandler";
import ClubsItems from "./component/clubs-items";
import AppConfig from "@/config";

let allLetter = "abcdefghijklmnopqrstuvwxyzåäö";

export const metadata = {
	title: "Clubs",
	description: "Clubs",
};

const ClubsPage = async () => {
	const res = await getChannels(
		AppConfig.organization.organizationId,
		AppConfig.organization.key
		// USE_CDN_URL
	);

	let sortedChannels = res?.data?.organization?.subOrganizations.sort((a, b) =>
		a?.name.localeCompare(b?.name, "fi-FI")
	);

	let content = res?.data?.organization?.subOrganizations;

	let x = [];
	content?.forEach((el) => {
		allLetter
			.toUpperCase()
			.split("")
			?.forEach((el1) => {
				if (el1 === el.name.split("")[0].toUpperCase()) {
					x.push(el1);
				}
			});
	});
	let filteredContent = [...new Set(x)];

	return <ClubsItems clubs={sortedChannels} content={filteredContent} allLetter={allLetter} />;
};

export default ClubsPage;

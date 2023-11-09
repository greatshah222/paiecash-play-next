import Container from "@/components/ui/container";
import AddNewClubClient from "../components/add-new-club-client";
import { getChannels } from "@/utils/datahandler";
import AppConfig from "@/config";
import { getTorneoClubs } from "@/actions/torneopal";

export const metadata = {
	title: "Create new club",
	description: "Create new club",
};

const AddNewClubPage = async () => {
	// WE WILL FETCH ALL CLUBS HERE

	const res = await getTorneoClubs();

	const allSuiteClub = await getChannels(
		AppConfig.organization.organizationId,
		AppConfig.organization.key
	);

	const allSuiteClubName = allSuiteClub?.data?.organization.subOrganizations.map((el) => el.name);

	// RESTRUCTURE BASED ON REACT SELECT DROPDOWN

	const restructuredClub = res?.data?.clubs?.map((el) => {
		return {
			value: el.club_id,
			label: el.name,
			nodeonid: el.club_sport_id,
		};
	});

	// FILTERING OUT CLUB WHICH ARE ALREADY REGISTERED IN OUR SYSTEM
	const filteredClub = restructuredClub?.filter((el) => !allSuiteClubName.includes(el?.label));

	return (
		<div className="bg-white ">
			<Container className={"md:bg-gray-50 max-w-[600px] w-full lg:w-[600px] lg:max-w-[600px] "}>
				<AddNewClubClient clubs={filteredClub} />
			</Container>
		</div>
	);
};

export default AddNewClubPage;

import moment from "moment";

import AdminContainer from "@/components/admin-container";
import { getCurrentUser } from "@/lib/getCurrentUser";
import {
	getAccountSettings,
	getSingleEventAdmin,
	updateAccountSettings,
} from "@/utils/datahandler";
import CreateNewEventClient from "../components/create-new-event-client";
import { fetchTorneoGames, getClubBasedonNodeonClubId } from "@/actions/torneopal";

/* 


FIRST NEED TO CHECK WHETHER TORNEOPAL ID EXISTS

IF IT EXITS DO NOTHING 


IF IT DOES NOT EXISTS WE HAVE TO FIRST FIND THE CLUBID(NODE) 


*/

const EditEventPage = async ({ params }) => {
	let { token, organizationId } = await getCurrentUser();

	const res = await getAccountSettings(organizationId, token);

	let isTorneopalIdExists = !!res?.data?.data?.torneopalClubId;

	let vismaSubmerchantId = res?.data?.data?.vismaSubmerchantId;

	const nodeonClubId = res?.data?.data?.nodeonClubId;

	// WE WILL GET THIS FROM OUR API SOON

	let torneopalClubId;
	if (isTorneopalIdExists) {
		torneopalClubId = res?.data?.data?.torneopalClubId;
	} else {
		if (nodeonClubId * 1 > 0) {
			// NOW WE HAVE TO SEND API REQUEST

			const clubRes = await getClubBasedonNodeonClubId(nodeonClubId);

			torneopalClubId = clubRes?.data?.club?.club_id;

			// NOW WE HAVE TO SAVE THIS TO OUR SYSTEM AS WELL WHEN WE GET THIS VALUE

			let settings = {
				torneopalClubId: clubRes?.data?.club?.club_id,
			};

			await updateAccountSettings(organizationId, token, settings);
		}
	}
	let data;
	if (params?.gameId) {
		data = await getSingleEventAdmin(organizationId, params?.gameId, token);
	}
	let games;
	if (torneopalClubId) {
		// WE ALSO FETCH ALL THE TEAMS

		let resGames = await fetchTorneoGames(torneopalClubId);

		if (resGames.length > 0) {
			// WE HAVE TO SORT THIS

			games = resGames?.map((el) => {
				return {
					value: el?.match_id,
					label: `${el?.team_A_name}- ${el?.team_B_name} - ${moment(el?.date).format(
						"DD.MM.YYYY"
					)}  - ${el?.time}`,
					game: el,
				};
			});
		}
	}
	return (
		<div className="bg-white ">
			<AdminContainer className={"bg-white"}>
				<CreateNewEventClient
					torneopalClubId={torneopalClubId}
					vismaSubmerchantId={vismaSubmerchantId}
					organizationId={organizationId}
					token={token}
					eventId={params?.gameId}
					data={data?.data?.game}
					games={games}
				/>
			</AdminContainer>
		</div>
	);
};

export default EditEventPage;

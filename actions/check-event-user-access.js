import AppConfig from "@/config";
import { ACTIONS } from "@/constants/action";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getPackages, getUser, getUserTickets } from "@/utils/datahandler";
import { getServerSession } from "next-auth";

const checkEventUserAccess = async (eventId, eventObj) => {
	const session = await getServerSession(authOptions);

	let isLoggedIn = !!session?.user;
	let locationGranted = false,
		ticketAccessgranted = false,
		isPaidEvent = false;

	const giveTicketAccess = () => {
		ticketAccessgranted = true;
		isPaidEvent = false;
	};
	const denyTicketAccess = () => {
		ticketAccessgranted = false;
		isPaidEvent = true;
	};

	if (!isLoggedIn) {
		// IF NOT LOGGED IN WE JUST GIVE FALSE TO ALL THE ACCCESS
		return { ticketAccessgranted, locationGranted, isPaidEvent };
	}

	if (session?.user?.role === ACTIONS.SUPER_ADMIN) {
		giveTicketAccess();
		return { ticketAccessgranted, locationGranted: true, isPaidEvent };
	}
	// GET ALL CONFIGURATION OF ORGANIZATION ->CURRENTLY PACKAGES ARE CREATED IN MAIN ORG NOT CHILD ORG THAT IS WHY PASS PARENT ORGID HERE

	const packages = await getPackages(AppConfig.organization.organizationId);
	console.log("API_1");

	// GET ALL CONFIGURATION OF ORGANIZATION ->CURRENTLY PACKAGES ARE CREATED IN MAIN ORG NOT CHILD ORG

	let allEventInPackage = packages?.packages
		.map((el) => el.configuration)
		?.filter((el1) => el1 !== "");

	let finalString = "";
	let isCurrentEventLocationGranted;

	allEventInPackage.forEach((el, i) => {
		if (i === allEventInPackage.length - 1) {
			finalString += el;
		} else {
			// we add : for all element except the last one
			finalString += `${el},`;
		}
	});

	// first we need to check if the game is free->if the game is free we dont have to make other API calls --<meaning final str

	if (
		!finalString.includes(eventId) &&
		(eventObj?.accessControls?.length === 0 || !eventObj?.accessControls)
	) {
		// THIS BASICALLY MEANS THIS GAME NETHER HAS A TICKET NOR IS IN A PACKAGE
		giveTicketAccess();
		return { ticketAccessgranted, locationGranted: true, isPaidEvent };
	}

	const user = await getUser(session?.user?.user_token, session?.user?.user_organization_id);
	console.log("API_2");

	const userTickets = await getUserTickets(
		AppConfig.organization.organizationId,
		session?.user?.user_token,
		AppConfig.organization.language
	);
	console.log("API_3");

	// GET ALL PACKAGES WHICH USER HAVE BOUGHT
	let userAllSKU = user?.data?.buyerProducts?.map((el) => el.sku) || [];

	// GET ALL TICKETS USER HAVE BOUGHT

	let ticketProfileSKU = userTickets?.data?.data?.map((el) => el.sku) || [];

	// MERGE ALL BOUGHT PRODUCTS
	userAllSKU = [...userAllSKU, ...ticketProfileSKU];

	if (finalString.includes(eventId)) {
		// event is included in some kind of packages

		// now filtering out sku which belings to current event
		let currentEventPackage = packages?.packages.filter((el) =>
			el?.configuration.includes(eventId)
		);

		// current Event SKU
		let divaripackageSKU = currentEventPackage.map((el1) => el1.sku);
		// first we have to check if location is granted or not
		if (divaripackageSKU?.length) {
			isCurrentEventLocationGranted = currentEventPackage.every((el) => el?.locationAccess?.access);
		}

		if (isCurrentEventLocationGranted) {
			// here if the package is granted location access we dont check for single ticket location at all
			if (!userAllSKU?.some((el) => divaripackageSKU?.includes(el))) {
				// if userAllSKu is not included in divariPackage it means user have not bought the product yet
				// if user have not bought the package ->check if they have bought the same event as single bought ticket
				const ticketExists = eventObj?.accessControls.find((el) => el.typeName === "Ticket");
				if (ticketExists) {
					//    CHECK FOT TICKET IN USER PROFILE

					const allUserBoughtTicket = userTickets?.data?.data?.map((el) => el?.eventId);

					if (allUserBoughtTicket?.includes(eventId * 1)) {
						// user has bought single ticket
						giveTicketAccess();
					} else {
						// not bought   ticket

						denyTicketAccess();
					}
				} else {
					// not bought ticket nor package
					denyTicketAccess();
				}
			} else {
				giveTicketAccess();
			}
			locationGranted = true;
		} else {
			locationGranted = false;
			denyTicketAccess(true);
		}
	} else if (eventObj?.accessControls?.length > 0) {
		const ticketExists = eventObj?.accessControls.find((el) => el.typeName === "Ticket");
		if (ticketExists) {
			//    CHECK FOT TICKET IN USER PROFILE
			isCurrentEventLocationGranted = ticketExists?.locationAccess?.access;

			if (isCurrentEventLocationGranted) {
				// check for ticket now

				const allUserBoughtTicket = userTickets?.data?.data?.map((el) => el?.eventId);

				if (allUserBoughtTicket?.includes(eventId * 1)) {
					giveTicketAccess();
				} else {
					denyTicketAccess();
				}
				locationGranted = true;
			} else {
				locationGranted = false;
				denyTicketAccess();
			}
		} else {
			// this should never reach here but just a prevention for any bug
			locationGranted = true;
			giveTicketAccess();
		}
	} else {
		// for free ticket we dont have location check for now
		locationGranted = true;

		ticketAccessgranted = true;
	}

	return { ticketAccessgranted, locationGranted, isPaidEvent };
};

export default checkEventUserAccess;

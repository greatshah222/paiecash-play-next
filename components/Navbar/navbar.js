import { getServerSession } from "next-auth";

import MainNav from "./main-nav";
import Logo from "./logo";
import Container from "../ui/container";
import MobileMainNav from "./mobile-main-nav";
import ClubSwitcher from "../club-switcher";

import { getChannels } from "@/utils/datahandler";
import AppConfig from "@/config";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ACTIONS } from "@/constants/action";

const Navbar = async () => {
	const session = await getServerSession(authOptions);

	let isSuperAdmin = session?.user?.role === ACTIONS.SUPER_ADMIN;

	let res, sortedOrganizationList;

	if (isSuperAdmin) {
		res = await getChannels(AppConfig.organization.organizationId, AppConfig.organization.key);

		sortedOrganizationList = res?.data?.organization?.subOrganizations.map((el) => {
			return {
				value: `${el.organizationId}:${el.secret}:${el.nodeonClubId}`,
				label: el.name,
				originalValue: el,
			};
		});
	}

	return (
		<div className="bg-white min-h-[80px] flex flex-col justify-start fixed z-[80] h-[80px] w-full">
			<Container
				className={"flex justify-between md:justify-start items-center py-0 sm:py-0 top-0 relative"}
			>
				{/* // ADDED TO SHOW LOGO IN MIDDLE FOR SMALLER SCREEN */}

				{session?.user?.role !== ACTIONS.SUPER_ADMIN && <div className="flex  flex-1 md:hidden" />}

				<Logo />

				<MainNav />
				{isSuperAdmin && <ClubSwitcher sortedOrganizationList={sortedOrganizationList} />}
				<div className="absolute right-[6%]">
					<MobileMainNav />
				</div>
			</Container>
		</div>
	);
};

export default Navbar;

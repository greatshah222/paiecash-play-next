import SeriesSelectorDropDown from "@/components/SeriesSelector/series-selector";
import Events from "@/components/Events/events";
import AppConfig from "@/config";
import Container from "@/components/ui/container";
import Banner from "@/components/banner";

export default function Home() {
	return (
		<Container className={"gap-y-10 flex flex-col"}>
			<Banner />
			{/* <SeriesSelectorDropDown organizationId={AppConfig.organization.organizationId} /> */}

			<Events organizationId={AppConfig.organization.organizationId} type="live" limit={20} />
			<Events organizationId={AppConfig.organization.organizationId} type="upcoming" limit={20} />
			<Events organizationId={AppConfig.organization.organizationId} type="past" limit={20} />
		</Container>
	);
}

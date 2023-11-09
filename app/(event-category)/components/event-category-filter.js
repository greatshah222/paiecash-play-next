import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Filter, X } from "lucide-react";
import Modal from "react-modal";
import moment from "moment";
import { toast } from "react-hot-toast";

import ReactDatePicker from "@/components/ui/DateRange/ReactDatePicker";
import { getFilteredGames } from "@/utils/datahandler";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/Header/header";
import Translations from "@/components/Translations";

const EventCategoryFilter = ({ orgId, setAllEvents, refetch, title }) => {
	const { t } = useTranslation();

	const [ranges, setRanges] = useState(null);
	const [startDateValue, setStartDateValue] = useState(new Date());
	const [endDateValue, setEndDateValue] = useState(new Date());
	const [showDateTimeModal, setShowDateTimeModal] = useState(false);
	const [upcomingFilterApplied, setupcomingFilterApplied] = useState(false);

	const fetchPastGames = (a, b, c, d) => {
		return getFilteredGames(a, b, c, d); // FIX ME -A,B,C,D,E
	};
	const selectionRange = {
		startDate: startDateValue,
		endDate: endDateValue,
		key: "selection",
	};
	const handleSelect = (ranges) => {
		setStartDateValue(ranges.selection.startDate);
		setEndDateValue(ranges.selection.endDate);
		setRanges(ranges);
	};
	const handleCloseDialog = () => {
		setShowDateTimeModal(!showDateTimeModal);
	};

	const handleConfirm = async () => {
		if (startDateValue.getTime() === endDateValue.getTime()) {
			return toast.error(`${t("eventsCategory.errorStartEndSame")}`, {
				autoClose: 10000,
				position: "top-center",
				theme: "dark",
			});
		}

		const res = await fetchPastGames(
			orgId,
			100,
			Date.parse(startDateValue),
			Date.parse(endDateValue)
		);

		if (res.data.status === "ok") {
			setAllEvents(res.data.games);
		}
		setStartDateValue(new Date());
		setEndDateValue(new Date());

		handleCloseDialog();
		setupcomingFilterApplied(true);
	};

	const removeAppliedFilter = useCallback(() => {
		setupcomingFilterApplied(false);
		refetch();
	}, [refetch]);
	return (
		<>
			<div className="flex flex-col md:flex-row items-center justify-between mb-5">
				<div className="flex justify-between items-center gap-4 ">
					<Header title={title} />
					<button onClick={handleCloseDialog}>
						<Filter className="text-black" />
					</button>
				</div>

				<div
					className={`flex gap-12 mb-10 sm:mb-0 text-sm smallcasebold justify-center items-center text-black`}
				>
					{upcomingFilterApplied && ranges && (
						<>
							{moment(ranges.selection.startDate).format("L")} -
							{moment(ranges.selection.endDate).format(" L")}
							{upcomingFilterApplied && (
								<button className="text-red-400 ml-4" onClick={removeAppliedFilter}>
									<X />
								</button>
							)}
						</>
					)}
				</div>
			</div>

			<Modal
				isOpen={showDateTimeModal}
				contentLabel="Select Date"
				className={"modal"}
				overlayClassName={"overlay"}
				onRequestClose={handleCloseDialog}
			>
				<div className="bg-white p-10 flex flex-col overflow-auto">
					<ReactDatePicker selectionRange={selectionRange} handleSelect={handleSelect} />
					<div className="flex justify-around items-center gap-12 mt-10">
						<Button variant="outline" className="w-full" onClick={handleConfirm}>
							<Translations text="shared.confirm" />
						</Button>
						<Button variant="destructive" className="w-full" onClick={handleCloseDialog}>
							<Translations text="shared.cancel" />
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default EventCategoryFilter;

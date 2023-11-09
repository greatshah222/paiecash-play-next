import { useEffect, useState } from "react";

export const useSearchParams = (
	selectedArea,
	selectedLevelContext,
	resetSelectedArea,
	resetSelectedLevel
) => {
	const [searchParam, setSearchParam] = useState(null);
	useEffect(() => {
		const runFunction = async () => {
			let searchParams;

			if (
				selectedArea?.length > 0 &&
				(selectedLevelContext?.length === 0 || !selectedLevelContext)
			) {
				searchParams = `&areaId=${selectedArea}`;
			} else if (
				(selectedArea?.length === 0 || !selectedArea) &&
				selectedLevelContext?.length > 0
			) {
				searchParams = `&levelId=${selectedLevelContext}`;
			} else if (selectedArea?.length > 0 && selectedLevelContext?.length > 0) {
				searchParams = `&levelId=${selectedLevelContext}&areaId=${selectedArea}`;
			} else if (resetSelectedArea || resetSelectedLevel) {
				searchParams = "&";
			}

			setSearchParam(searchParams);
		};

		if (
			selectedArea?.length > 0 ||
			selectedLevelContext?.length > 0 ||
			resetSelectedLevel ||
			resetSelectedArea
		) {
			runFunction();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		// eslint-disable-next-line react-hooks/exhaustive-deps
		JSON.stringify(selectedArea),

		// eslint-disable-next-line react-hooks/exhaustive-deps
		JSON.stringify(selectedLevelContext),
		selectedArea,
		selectedLevelContext,
	]);

	return { searchParam };
};

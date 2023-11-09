"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

const ToggleDescription = ({
	isDescriptionOpen,
	descriptionClosehandler,
	descriptionOpenhandler,
}) => {
	return isDescriptionOpen ? (
		<button onClick={descriptionClosehandler} aria-label="See more description" className="h-8">
			<ChevronUp className={"w-8 h-8"} fill="brand" />
		</button>
	) : (
		<button onClick={descriptionOpenhandler} aria-label="See less description" className="h-8">
			<ChevronDown className={"w-8 h-8"} fill="brand" />
		</button>
	);
};

export default ToggleDescription;

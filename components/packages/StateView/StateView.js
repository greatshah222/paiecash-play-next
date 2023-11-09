"use client";

import { PAGESTATE } from "@/app/(payment)/packages/[...params]/component/constants";
import Translations from "@/components/Translations";

import classes from "./StateView.module.css";

const StateView = ({ pageState, changePageState }) => {
	return (
		<div className={classes.stateViewContainer}>
			<div
				className={`${classes.stateView} ${
					pageState === PAGESTATE.EVENT ? classes.stateViewSelected : ""
				}`}
				onClick={() => changePageState && changePageState(PAGESTATE.EVENT)}
			>
				<div className={`${classes.title} text-md`}>
					<Translations text="packages.PackageChoosePackage" />
				</div>
			</div>
			<div
				className={`${classes.stateView} ${
					pageState === PAGESTATE.PAYMENT ? classes.stateViewSelected : ""
				}`}
			>
				<div className={`${classes.title} text-md`}>
					<Translations text="packages.PackagePayment" />
				</div>
			</div>
			<div
				className={`${classes.stateView} ${
					pageState === PAGESTATE.RECEIPT ? classes.stateViewSelected : ""
				}`}
			>
				<div className={`${classes.title} text-md`}>
					<Translations text="packages.PackageReceipt" />
				</div>
			</div>
		</div>
	);
};

export default StateView;

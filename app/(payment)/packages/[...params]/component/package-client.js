"use client";

import { useCallback, useState } from "react";

import StateView from "@/components/packages/StateView/StateView";
import PaymentComponent from "@/components/packages/payment-component";
import { useMyContext } from "@/context/StateHolder";

import PackageComponentClient from "./package-component-client";
import { PAGESTATE } from "./constants";

const PackageClient = ({
	userPackages,
	pkg,
	paymentMethods,
	params,
	mainOrganizationPackage,
	...props
}) => {
	console.log("paymentMethods", paymentMethods, props, pkg);
	const { setSelectedPackage } = useMyContext();
	const [pageState, setPageState] = useState(params?.[1]);

	const changePageState = useCallback(
		(newState) => {
			if (pageState !== PAGESTATE.RECEIPT) {
				setPageState(newState);
				setSelectedPackage({});
			}
		},
		[pageState, setSelectedPackage]
	);
	const selectPackage = (pkg) => {
		setPageState(PAGESTATE.PAYMENT);
		setSelectedPackage(pkg);
	};

	return (
		<div>
			<StateView pageState={pageState} changePageState={changePageState} />

			{pageState === PAGESTATE.EVENT && (
				<PackageComponentClient
					userPackages={userPackages}
					selectPackage={selectPackage}
					pkg={pkg}
				/>
			)}
			{pageState === PAGESTATE.PAYMENT && (
				<PaymentComponent
					changePageState={changePageState}
					paymentMethods={paymentMethods}
					params={params}
					mainOrganizationPackage={mainOrganizationPackage}
				/>
			)}
		</div>
	);
};

export default PackageClient;

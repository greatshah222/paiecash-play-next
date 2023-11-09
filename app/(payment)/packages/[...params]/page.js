import Container from "@/components/ui/container";
import AppConfig from "@/config";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getPackages, getPaymentMethods, getUser } from "@/utils/datahandler";
import PackageClient from "./component/package-client";
import ReceiptPage from "@/app/(payment)/packages/[...params]/component/receipt";

export const metadata = {
	title: "Payment-SalibandyTv",
	description: "Payment-SalibandyTv",
};

const PackagesPage = async ({ params: { params }, searchParams }) => {
	const { token, organizationId } = await getCurrentUser();
	let [orgId, _, itemId] = params;

	const userRes = await getUser(token, organizationId);

	// EVENTPACKAGE IS THE PACKAGE(TICKET) BELONGING TO THAT SPECIFIC TICKET

	// MAINORGANIZATIONPACKAEGRES IS THE PACKAGE THAT WE CREATE MANUALLY AND ADD ALL THE CONFIGURATION ESPECIALLY IN CASE OF TOURNAMENTS. THEY ARE MOSTLY SUBSCRIPTION PACKAGE TO ACCCESS MANY EVENTS WITH JUST 1 PACKAGE

	const [eventPackage, mainOrganizationPackage] = await Promise.all([
		getPackages(orgId, itemId),
		getPackages(AppConfig.organization.organizationId, itemId),
	]);

	const paymentMethods = await getPaymentMethods(AppConfig.organization.organizationId);

	let allCombinedPackages = [];

	if (eventPackage?.status === "ok") {
		allCombinedPackages = [...allCombinedPackages, ...eventPackage?.packages];
	}

	if (mainOrganizationPackage?.status === "ok") {
		allCombinedPackages = [...allCombinedPackages, ...mainOrganizationPackage?.packages];
	}

	let receiptProductId = !!searchParams?.productId;

	let isVoucherActivated = receiptProductId && !!searchParams?.voucherActivated;

	let boughtProduct;
	if (receiptProductId) {
		boughtProduct = allCombinedPackages.find((el) => el.id === searchParams?.productId * 1);
	}

	return (
		<div className="bg-white w-full">
			<Container className={"bg-white  w-full h-full"}>
				{receiptProductId ? (
					<ReceiptPage
						searchParams={searchParams}
						boughtProduct={boughtProduct}
						isVoucherActivated={isVoucherActivated}
						eventRoute={`/event/${orgId}/${itemId}`}
					/>
				) : (
					<PackageClient
						pkg={allCombinedPackages}
						userPackages={userRes?.data?.buyerProducts ? userRes?.data?.buyerProducts : []}
						paymentMethods={paymentMethods?.data}
						params={params}
						mainOrganizationPackage={mainOrganizationPackage?.packages}
						searchParams={searchParams}
					/>
				)}
			</Container>
		</div>
	);
};

export default PackagesPage;

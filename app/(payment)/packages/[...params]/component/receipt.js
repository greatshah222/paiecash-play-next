import { getCurrentUser } from "@/lib/getCurrentUser";
import { getPurchasePackage } from "@/utils/datahandler";
import StateView from "../../../../../components/packages/StateView/StateView";
import ReceiptClient from "./receipt-client";

const ReceiptPage = async ({ searchParams, boughtProduct, isVoucherActivated, eventRoute }) => {
	const { token } = await getCurrentUser();
	let isSuccess, errorCode;

	if (!isVoucherActivated) {
		let newParams = {
			...searchParams,
			userToken: token,
		};
		const purchaseResponse = await getPurchasePackage(newParams);
		if (purchaseResponse?.data?.status === "ok") {
			isSuccess = true;
		} else {
			//27 is double purchase. We will count it as a success still
			if (purchaseResponse?.data?.errorCode === 27) {
				isSuccess = true;
			} else {
				isSuccess = false;
				errorCode = purchaseResponse?.data?.errorCode;
			}
		}
	} else {
		isSuccess = true;
	}
	return (
		<>
			<StateView pageState={"receipt"} />

			<ReceiptClient
				isSuccess={isSuccess}
				errorCode={errorCode}
				boughtProduct={boughtProduct}
				eventRoute={eventRoute}
			/>
		</>
	);
};

export default ReceiptPage;

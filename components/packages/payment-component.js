"use client";
import { useState } from "react";
import isURL from "validator/lib/isURL";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

import SelectedPackage from "./SelectedPackage/SelectedPackage";
import Translations from "../Translations";
import VoucherView from "./voucher-component";
import PaymentMethod from "./payment-method";

import { useMyContext } from "@/context/StateHolder";
import AppConfig from "@/config";
import { getPaymentUrl } from "@/utils/datahandler";
import { cn } from "@/lib/utils";

const PaymentComponent = ({ paymentMethods, params, mainOrganizationPackage }) => {
	let [orgId, _, itemId] = params;

	const router = useRouter();
	const session = useSession();
	const { t } = useTranslation();

	const { selectedPackage, packageTargetOrganization } = useMyContext();

	const [voucherView, setVoucherView] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [paymentMethodError, setPaymentMethodError] = useState(null);

	const buyPackage = async (methodId, packageId) => {
		setIsLoading(true);
		setPaymentMethodError(null);

		let handlerUrl = window.location.protocol + "//" + window.location.hostname;
		handlerUrl += window.location.hostname.includes("localhost") ? ":" + window.location.port : "";
		handlerUrl += `/packages/${orgId}/receipt`;
		handlerUrl = handlerUrl + `/${itemId}`;

		try {
			let isMainOrganizationPackage = !!mainOrganizationPackage.find((el) => el?.id === packageId); // THIS MEANS PACKAGE IS NOT OF TYPE TICKET AND WHEN IT IS NOT TICKET WE HAVE TO PROVIDE TICKET QUANITY AS 0 AND USER TOKEN TO API

			const paymentUrl = await getPaymentUrl(
				session?.data?.user?.user_token,

				AppConfig.packages.divariGamesPackageId?.includes(packageId)
					? packageTargetOrganization
					: orgId,
				packageId,
				methodId,
				session?.data?.user?.user_email,
				handlerUrl,

				isMainOrganizationPackage ? 0 : 1
			);

			// handlerUrl is return URl in sucess
			setIsLoading(false);

			if (
				paymentUrl.data?.status === "ok" &&
				typeof paymentUrl?.data?.redirectUrl !== "undefined" &&
				isURL(paymentUrl?.data?.redirectUrl)
			) {
				window.location.replace(paymentUrl?.data?.redirectUrl);
			} else {
				let errorCode = 19;
				if (
					paymentUrl.data?.status === "error" &&
					typeof paymentUrl?.data?.errorCode !== "undefined"
				) {
					errorCode = paymentUrl?.data?.errorCode;
				}
				setPaymentMethodError(t("packages.PurchaseErrorCode" + errorCode));
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	const buyFunction = (methodId, methodKey) => {
		if (Object.keys(selectedPackage).length === 0) {
			return;
		}
		if (
			selectedPackage.id === AppConfig.packages?.inssiDivari?.packageId &&
			!(packageTargetOrganization > 0)
		) {
			console.log("target club is needed, but this should be checked earlier");

			return;
		}
		if (methodKey === "voucher") {
			setVoucherView("active");
		} else {
			buyPackage(methodId, selectedPackage.id);
		}
	};

	return (
		<>
			<SelectedPackage />;
			<div className="text-muted-foreground flex flex-col gap-4">
				<div className={`text-md text-gray-800`}>
					<Translations text="packages.PackagePaymentMethods" />
				</div>
				<div className={`text-sm`}>
					<Translations text="packages.PackagePaymentHelp" />
				</div>
			</div>
			{isLoading && (
				<Loader className="animate-spin w-12 h-12 text-brandHover flex justify-center items-center mx-auto " />
			)}
			{!voucherView ? (
				<div
					className={cn(
						"flex flex-col bg-gray-50 py-3 px-6 my-10 gap-5 justify-start items-center md:flex-row",
						isLoading && "pointer-events-none"
					)}
				>
					{Object.values(paymentMethods?.paymentMethods).map((el) => (
						<PaymentMethod key={el.id} paymentMethod={el} onClick={buyFunction} />
					))}
				</div>
			) : (
				<div
					className={
						"flex flex-col bg-gray-50 py-3 px-6 my-10 gap-5 justify-start items-center md:flex-row w-full"
					}
				>
					<VoucherView
						setVoucherView={setVoucherView}
						selectedPackage={selectedPackage}
						moveToReceipt={() => {
							router.push(
								`/packages/${orgId}/receipt/${itemId}?productId=${selectedPackage?.id}&voucherActivated=true`
							);
						}}
						mainOrganizationPackage={mainOrganizationPackage}
					/>
				</div>
			)}
			{paymentMethodError && (
				<div className="text-red-700 text-sm text-center">{paymentMethodError}</div>
			)}
		</>
	);
};

export default PaymentComponent;

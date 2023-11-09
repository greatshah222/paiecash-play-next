"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useMyContext } from "@/context/StateHolder";

import SelectedPackage from "../../../../../components/packages/SelectedPackage/SelectedPackage";

const ReceiptClient = ({ isSuccess, errorCode, boughtProduct, eventRoute }) => {
	const router = useRouter();
	const { t } = useTranslation();

	const { setSelectedPackage } = useMyContext();

	useEffect(() => {
		if (boughtProduct?.id) {
			setSelectedPackage(boughtProduct);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [boughtProduct?.id]);

	return (
		<div className={"text-muted-foreground text-md"}>
			<SelectedPackage />

			<div
				className={"mb-5 bg-gray-50 p-6 flex flex-col gap-y-4 justify-start items-start space-y-4"}
			>
				{isSuccess && (
					<>
						<p>{t("packages.ReceiptThank")}</p>
						<p className="underline">{t("packages.PackageHelpText3")}</p>
					</>
				)}

				{!isSuccess && errorCode && (
					<div className={"text-red-700 flex gap-y-2 flex-col"}>
						<p>{t("packages.ReceiptPurchaseFailed")}</p>
						<p>{t("packages.PurchaseErrorCode" + errorCode)}</p>
					</div>
				)}
				<div className="flex gap-3">
					<Button
						className={"w-auto"}
						variant="outline"
						onClick={() => router.push("/")}
						aria-label={"Move to home"}
						size="lg"
					>
						{t("packages.ReceiptMoveToFront")}
					</Button>
					{isSuccess && (
						<Button
							className={"w-auto"}
							onClick={() => {
								router.refresh();

								router.push(eventRoute);
							}}
							aria-label={"Move to event"}
							size="lg"
						>
							{t("packages.ReceiptMoveToOrig")}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ReceiptClient;

"use client";
import { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";

import { trancuateText } from "@/lib/trancuateText";
import { convertCurrency } from "@/lib/convertCurrency";
import { addZeroes } from "@/lib/addZeroes";
import Translations from "@/components/Translations";
import AppConfig from "@/config";
import { useMyContext } from "@/context/StateHolder";

import ToggleDescription from "../ToggleDescription/ToggleDescription";
import { Button } from "../ui/button";
import { Input } from "../ui/Input/Input";
import { VALIDATOR_REQUIRE } from "../ui/Validation/Validator";

const getInssiTeams = AppConfig.packages.inssiDivari.teams.map((value) => {
	return { label: value.name, value: value.organizationId };
});
const getNaistenTeams = AppConfig.packages.naistenDivari.teams.map((value) => {
	return { label: value.name, value: value.organizationId };
});

const PackageComponent = ({ pkg, buyButtonAction, userPackages }) => {
	const { t } = useTranslation();

	const { setPackageTargetOrganization, packageTargetOrganization } = useMyContext();

	let description1 = pkg?.description;

	const [desc, setDesc] = useState("");
	const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		if (description1?.length > 148) {
			setDesc(trancuateText(description1, 148));
			setHasMore(true);
		} else {
			setDesc(description1);
		}
	}, [description1]);

	const descriptionOpenhandler = useCallback(() => {
		setIsDescriptionOpen(true);
		setDesc(description1);
	}, [description1]);
	const descriptionClosehandler = useCallback(() => {
		setIsDescriptionOpen(false);

		setDesc(trancuateText(description1, 148));
	}, [description1]);

	const packageAlreadyBought = !!(
		userPackages.findIndex(
			(userPkg) =>
				userPkg.sku === pkg.sku && userPkg.validFrom < Date.now() && userPkg.validTo > Date.now()
		) !== -1
	);

	const selectPackageOrganization = (el, val) => {
		setPackageTargetOrganization(val);
	};
	const buyOnClickHandler = () => {
		// CHECK IG PACKAGE BELONG TO INSSI DIVARI/NAISTEN DIVARI NEED TO SELECT ORG IN CASE IT BELONGS THERE

		if (AppConfig.packages.divariGamesPackageId?.includes(pkg.id) && !packageTargetOrganization) {
			return toast.error(t("packages.SelectPaymentClub"));
		}

		// if (

		// 	(pkg?.id === AppConfig.packages.inssiDivari.packageId ||
		// 		pkg?.id === AppConfig.packages.naistenDivari.packageId) &&
		// 	!packageTargetOrganization
		// ) {
		// 	return toast.error(t("packages.SelectPaymentClub"));
		// }
		buyButtonAction(pkg);
	};

	const packageGameType =
		pkg?.id === AppConfig.packages.inssiDivari.packageId
			? "inssi"
			: pkg?.id === AppConfig.packages.naistenDivari.packageId
			? "naisten"
			: null;
	return (
		<>
			<div
				className={
					"border border-muted-foreground min-h-[361px] w-sm max-w-sm relative flex flex-col justify-between gap-4"
				}
				key={pkg.id}
			>
				<div className={`text-brand font-bold border-b p-4 text-lg h-[50px]`}>
					{pkg.name?.length > 40 ? `${pkg.name?.slice(0, 37)}...` : pkg.name}
				</div>
				<div className={"px-4 border-b min-h-[120px] flex flex-1 flex-col justify-between"}>
					<div className="flex flex-1 justify-between">
						<div
							className={`text-muted-foreground text-sm`}
							dangerouslySetInnerHTML={{ __html: desc }}
						/>

						{hasMore && (
							<ToggleDescription
								isDescriptionOpen={isDescriptionOpen}
								descriptionClosehandler={descriptionClosehandler}
								descriptionOpenhandler={descriptionOpenhandler}
							/>
						)}
					</div>
					{packageGameType && (
						// USER MUST SELECT WHICH ORGANIZATION MONEY GOES IN CASE OF CUTOM EVENTS WHICH ARE CREATED BY US
						<Input
							id="INSSI_PACKAGE_TEAM"
							type="text"
							element={"select_dropdown"}
							validators={[VALIDATOR_REQUIRE()]}
							placeholder={"Valitse seura"}
							errorText={"error"}
							onInput={selectPackageOrganization}
							selectData={packageGameType === "inssi" ? getInssiTeams : getNaistenTeams}
							defaultValue={""}
							initialValue={""}
							initialValid={true}
							disabled={false}
						/>
					)}
				</div>

				<div
					className={
						"text-white/80 break-words bg-brandHover p-4 flex  justify-between items-center text-md"
					}
				>
					<div className={``}>
						{convertCurrency(pkg.currency)} {addZeroes(pkg.price)}
					</div>
					<div>{`${t("packages.vat")} ${pkg?.taxRate} %`}</div>
				</div>
				<div className={"flex justify-center items-center p-4 w-full"}>
					<div className={"flex flex-col gap-4 w-full"}>
						<div id={pkg.id} name={pkg.id} onClick={buyOnClickHandler}>
							<Button
								aria-label="Order Game pacakge"
								className="w-full rounded-full"
								size="lg"
								disabled={packageAlreadyBought}
							>
								{packageAlreadyBought ? "Bought" : <Translations text="packages.Order" />}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PackageComponent;

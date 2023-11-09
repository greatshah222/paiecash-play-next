import { addZeroes } from "@/lib/addZeroes";
import { convertCurrency } from "@/lib/convertCurrency";

import Translations from "@/components/Translations";

import classes from "./SelectedPackage.module.css";
import { useMyContext } from "@/context/StateHolder";

//just prints selected PAckage data. It is used in both receipt and paymentMethods views
const SelectedPackage = () => {
	const { selectedPackage } = useMyContext();

	if (selectedPackage?.length === 0 || !selectedPackage || !selectedPackage?.id) {
		return null;
	} else {
		const taxPerc = selectedPackage.taxRate;

		return (
			<div
				className={`${classes.selectedPackage} p-5 flex flex-col justify-center items-start bg-gray-50 text-muted-foreground mb-16 w-full`}
			>
				<div className={`${classes.selectedPackagePrimary} font-probold text-gray-800`}>
					<div className={classes.selectedPackageList_name}>
						<Translations text="packages.productName" />
					</div>
					<div className={classes.selectedPackageList}>
						<Translations text="packages.price" />
					</div>

					<div className={classes.selectedPackageList}>
						<Translations text="packages.vat" />
					</div>

					<div className={classes.selectedPackageList}>
						<Translations text="packages.quantity" />
					</div>

					<div className={classes.selectedPackageList}>
						<Translations text="packages.totalPrice" />
					</div>
				</div>
				<div className={`${classes.selectedPackagePrimary} text-sm`}>
					<div className={classes.selectedPackageList_name}>{selectedPackage.name}</div>
					<div className={classes.selectedPackageList}>
						{addZeroes(selectedPackage.price)} {convertCurrency(selectedPackage.currency)}
					</div>

					<div className={classes.selectedPackageList}>{taxPerc}%</div>

					<div className={classes.selectedPackageList}>{1}</div>

					<div className={classes.selectedPackageList}>
						{addZeroes(selectedPackage.price)} {convertCurrency(selectedPackage.currency)}
					</div>
				</div>
			</div>
		);
	}
};

export default SelectedPackage;

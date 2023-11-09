"use client";

import Translations from "@/components/Translations";
import PackageComponent from "@/components/packages/package-component";

const PackageComponentClient = ({ userPackages, selectPackage, pkg }) => {
	return (
		<>
			<div className={"text-muted-foreground text-md"}>
				<div className={"mb-5 bg-gray-50 p-6"}>
					<Translations text="packages.PackageHelpText" />
					<br />
					<br />

					<Translations text="packages.PackageHelpText2" />

					<p className="underline mt-5">
						<Translations text="packages.PackageHelpText3" />
					</p>
				</div>
			</div>
			<div className="grid gap-y-8 md:gap-2 items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-24">
				{pkg?.map((el) => (
					<PackageComponent
						pkg={el}
						key={el}
						userPackages={userPackages}
						buyButtonAction={selectPackage}
					/>
				))}
			</div>
		</>
	);
};

export default PackageComponentClient;

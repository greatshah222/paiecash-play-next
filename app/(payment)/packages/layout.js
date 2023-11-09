import Footer from "@/components/footer";

const PackageLayout = ({ children }) => {
	return (
		<>
			<div className="pb-60 bg-white">{children}</div>
			<Footer />
		</>
	);
};

export default PackageLayout;

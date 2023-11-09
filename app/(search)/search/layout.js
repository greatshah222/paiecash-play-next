import Footer from "@/components/footer";

export const metadata = {
	title: "Search events",
	description: "Search events",
};
const SearchLayout = ({ children }) => {
	return (
		<>
			{children}
			<Footer />
		</>
	);
};

export default SearchLayout;

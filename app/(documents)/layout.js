import Footer from "@/components/footer";
import React from "react";

const DocumentsLayout = ({ children }) => {
	return (
		<>
			{children}
			<Footer />
		</>
	);
};

export default DocumentsLayout;

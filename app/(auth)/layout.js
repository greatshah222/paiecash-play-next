import Footer from "@/components/footer";

const AuthLayout = ({ children }) => {
	return (
		<>
			{children}
			<Footer />
		</>
	);
};

export default AuthLayout;

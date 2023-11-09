import { AdminMobileSidebar } from "@/components/AdminSidebar/admin-mobile-sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import Footer from "@/components/footer";

export const metadata = {
	title: "Admin Dashboard",
	description: "SalibandyTV admin dashboard",
};

const LayoutAdmin = ({ children }) => {
	return (
		<div className="h-full relative w-full">
			{/* // VISIBLE IN DESKTOP */}
			<div className="sidebar-container">
				<AdminSidebar />
			</div>

			{/* VISIBLE IN MOBILE */}
			<AdminMobileSidebar />

			<div className="main-container">
				{children}

				<div className="text-white">
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default LayoutAdmin;

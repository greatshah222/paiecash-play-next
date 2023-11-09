import Footer from "@/components/footer";
import UserSidebar from "@/components/user-sidebar";
import { UserMobileSidebar } from "@/components/user-sidebar/user-mobile-sidebar";
import { cn } from "@/lib/utils";

const LayoutUser = ({ children }) => {
	return (
		<div className="h-full relative w-full">
			<div className="sidebar-container">
				<UserSidebar />
			</div>
			<UserMobileSidebar />

			<div className={cn("main-container", "text-white")}>
				{children}
				<Footer />
			</div>
		</div>
	);
};

export default LayoutUser;

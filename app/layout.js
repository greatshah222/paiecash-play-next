import localFont from "next/font/local";

import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ReactCookiesProvider } from "@/providers/react-cookie-provider";
import { ReactStateProvider } from "@/providers/react-state-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { NextAuthSessionProvider } from "@/providers/next-auth-session-provider";
import { ReactNexti18nProvider } from "@/providers/react-next-i18n-provider";

import LoginModal from "@/components/modal/LoginModal";
import ClubCreationModal from "@/components/modal/club-creation-modal";
// import GoogleAnalytics from "@/components/google-analytics";

import Navbar from "@/components/Navbar/navbar";

import "react-loading-skeleton/dist/skeleton.css"; // skeleton

import "./styles/globals.css";
import "./styles/swiper.css";
import "./styles/live-player-safari.css";
import "./styles/event-filter-modal.css";

const regular = localFont({
	src: "../constants/fonts/Heading-Pro-Regular.otf",
	variable: "--font-regular",
});

const proBold = localFont({
	src: "../constants/fonts/Heading-Pro-Bold.otf",
	variable: "--font-pro-bold",
});

export const metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),

	title: "Paiecashplay",
	description: "Paiecashplay ",
	openGraph: {
		images: ["/images/og-image/share.png"],

		title: "Paiecashplay",
		description: "Paiecashplay ",
	},
};

// test@test1.com/11111
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${regular.variable}  ${proBold.variable} font-regular h-full`}>
				<NextAuthSessionProvider>
					<ReactNexti18nProvider>
						<ReactCookiesProvider>
							<ReactStateProvider>
								<ReactQueryProvider>
									<LoginModal />
									<ClubCreationModal />
									<ToastProvider />

									<Navbar />

									{children}
								</ReactQueryProvider>
							</ReactStateProvider>
						</ReactCookiesProvider>
					</ReactNexti18nProvider>
				</NextAuthSessionProvider>
			</body>

			{/* <GoogleAnalytics /> */}
		</html>
	);
}

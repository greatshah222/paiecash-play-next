import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		console.log("req", req);
		// const path = request.nextUrl.pathname;

		// const isPublicPath = path === "/auth/login" || path === "/auth/signup";
		// const token = req.nextauth.token;
		// if (isPublicPath && token) {
		// 	return NextResponse.redirect(new URL("/", req.url));
		// }

		if (
			req.nextUrl.pathname.startsWith("/admin/") &&
			!req.nextauth.token?.role?.toLowerCase()?.includes("admin")
		) {
			// IF NOT ADMIN
			return NextResponse.redirect(new URL("/", req.url));
		}
	},
	{
		callbacks: {
			// authorized: ({ token }) => console.log(token),
		},
	}
);

// BELOW ARE PROTECTED ROUTES

export const config = {
	matcher: ["/admin/:path*", "/user/:path*", "/packages/:path*"],
};

import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

import { ACTIONS } from "@/constants/action";
import AppConfig from "@/config";

let res;
export const authOptions = {
	// Configure one or more authentication providers

	providers: [
		CredentialsProvider({
			name: "Credentials",

			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				try {
					let role = credentials?.role ? credentials?.role : ACTIONS.USER;

					let url = `${AppConfig.BASE_URL_MY}/login?action=${ACTIONS.AUTHENTICATE}`;

					res = await axios.get(url, {
						params: {
							eMail: credentials.username,
							password: credentials.password,
							role,
							organizationId: AppConfig.organization.organizationId,
							getSecret: true,
						},
					});

					let user = {
						...res?.data,
						role: credentials?.role ? credentials?.role : ACTIONS.USER,
					};

					if (res?.data?.status === "ok") {
						if (role === ACTIONS.USER) {
						}

						return user;
					} else {
						// OUR API DOES NOT GIVE ERROR WHEN WRONG CREDENTIALS SO HAVE TO THROW ERROR
						throw new Error(res?.data?.message || "Something went wrong.Please try later");
					}
				} catch (error) {
					console.log(error, 10);
					throw new Error(res?.data?.message || "Something went wrong.Please try later");
				}
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token, user }) {
			// here token is value returned from above callback jwt
			session.user = token;

			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
	debug: process.env.NODE_ENV === "development",
	session: {
		strategy: "jwt",
	},
};

export default NextAuth(authOptions);

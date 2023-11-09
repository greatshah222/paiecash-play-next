"use client";

// THIRD PARTY IMPORT
import Lottie from "lottie-react";
import Link from "next/link";

import Translations from "@/components/Translations";
import { Button } from "@/components/ui/button";
import invalidToken from "@/constants/assets/images/lottie/invalid.json";

const PasswordInvalidToken = () => {
	return (
		<div className={"text-black flex flex-col justify-center items-center gap-3 text-lg"}>
			<h1 className="py-5 text-red-700 font-probold  text-4xl">
				<Translations text="form.password.invalidLink" />
			</h1>

			<Lottie animationData={invalidToken} loop={false} style={{ height: 200 }} />
			<div className="text-md">
				<Translations text="form.password.tokenExpired" />
			</div>

			<div className="text-md">
				<Translations text="form.password.getNewEmail" />
			</div>

			<Link href={"/auth/reset-password"}>
				<Button
					className={`w-full min-h-[40px] text-md rounded-full font-probold mt-3`}
					aria-label="Request reset password"
				>
					<Translations text="form.password.requestResetPassword" />
				</Button>
			</Link>
		</div>
	);
};

export default PasswordInvalidToken;

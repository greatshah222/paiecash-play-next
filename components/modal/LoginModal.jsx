"use client";

import { usePathname, useRouter } from "next/navigation";

import useLoginModal from "@/hooks/useLoginModal";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import Translations from "../Translations";

const LoginModal = () => {
	const loginModal = useLoginModal();
	const router = useRouter();
	const pathname = usePathname();

	const loginCallback = () => {
		router.push(`/auth/login?callbackUrl=${process.env.NEXT_PUBLIC_SITE_URL}/${pathname}`);
	};

	return (
		<div className="bg-brand">
			<Modal
				title={<Translations text="navigation.auth.login" />}
				isOpen={loginModal.isOpen}
				onClose={loginModal.onClose}
				description={<Translations text="shared.authenticateToAccess" />}
			>
				<div className="flex gap-4">
					<Button className="bg-brand" onClick={loginCallback}>
						<Translations text="navigation.auth.login" />
					</Button>
					<Button variant="secondary">
						<Translations text="navigation.auth.register" />
					</Button>
				</div>
			</Modal>
		</div>
	);
};

export default LoginModal;

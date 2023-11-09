"use client";

import Lottie from "lottie-react";

import { Modal } from "../ui/modal";
import Translations from "../Translations";
import lottieImage from "@/constants/assets/images/lottie/club-create.json";
import useCreateClubModal from "@/hooks/use-create-club-modal";
import { useMyContext } from "@/context/StateHolder";

const ClubCreationModal = () => {
	const { initialLanguageLoaded } = useMyContext();
	const clubModal = useCreateClubModal();

	if (!initialLanguageLoaded) return null;
	return (
		<div className="bg-white">
			<Modal
				title={<Translations text="form.club.creatingClub" />}
				description={<Translations text="form.club.creatingClubMessage1" />}
				isOpen={clubModal.isOpen}
				onClose={() => {}}
			>
				<div className="pt-6 flex items-center space-x-2  justify-center w-full">
					<div className="text-red-600 text-3xl  flex flex-col justify-center items-center">
						<Translations text="form.club.creatingClubMessage2" />

						<Lottie animationData={lottieImage} loop={true} style={{ height: "30vh" }} />
					</div>
					<div></div>
					<div></div>
				</div>
			</Modal>
		</div>
	);
};

export default ClubCreationModal;

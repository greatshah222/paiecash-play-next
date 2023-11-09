"use client";

import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import Translations from "../Translations";

const AlertModal = ({ isOpen, onClose, onConfirm, loading }) => {
	return (
		<div className="bg-white">
			<Modal
				title={<Translations text="modal.alertModal.areyousure" />}
				description={<Translations text="modal.alertModal.actionUndone" />}
				isOpen={isOpen}
				onClose={onClose}
			>
				<div className="pt-6 flex items-center space-x-2 justify-end w-full">
					<Button disabled={loading} variant="outline" onClick={onClose}>
						<Translations text="shared.cancel" />
					</Button>
					<Button disabled={loading} variant="destructive" onClick={onConfirm}>
						<Translations text="shared.continue" />
					</Button>
				</div>
			</Modal>
		</div>
	);
};

export default AlertModal;

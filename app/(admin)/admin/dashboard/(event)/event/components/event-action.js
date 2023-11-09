"use client";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

import AlertModal from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { deleteGame } from "@/utils/datahandler";

const EventAction = ({ gameId, token, organizationId }) => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const { t } = useTranslation();
	const onDelete = async () => {
		setLoading(true);

		const res = await deleteGame(organizationId, gameId, token);

		if (res?.data?.status === "ok") {
			toast.success(t("addnewgame.deleteSuccess"));

			setTimeout(() => {
				router.push("/admin/dashboard/create-new-event");
			}, 300);
		} else {
			toast.error(t("shared.errorGeneric"));
		}

		setOpen(false);
		setLoading(false);
	};
	return (
		<>
			<div className="flex gap-x-2 justify-end items-center flex-1">
				<Link href={`/admin/dashboard/create-new-event/${gameId}`}>
					<Button size="icon">
						<Edit className="w-4 h-4" />
					</Button>
				</Link>
				<Button variant="destructive" onClick={() => setOpen(true)}>
					<Trash className="w-4 h-4" />
				</Button>
			</div>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
		</>
	);
};

export default EventAction;

"use client";
import { Edit, Lock, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

import AlertModal from "@/components/modal/alert-modal";
import IconButton from "@/components/ui/icon-button";
import { deleteUser } from "@/utils/datahandler";
import { ACTIONS } from "@/constants/action";

const CellAction = ({ data }) => {
	const router = useRouter();
	const [cookies] = useCookies("");
	const { t } = useTranslation();

	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const session = useSession();

	let organizationId, secret;

	if (session?.data?.user?.role === ACTIONS.SUPER_ADMIN) {
		organizationId = cookies?.supAdOrg;
		secret = cookies?.supAdSec;
	} else {
		organizationId = session?.data?.user?.user_organization_id;
		secret = session?.data?.user?.user_secret;
	}

	const onDelete = async () => {
		try {
			setLoading(true);
			await deleteUser(organizationId, data?.userId, secret, session?.data?.user?.user_token);
			router.refresh();

			toast.success(t("shared.deletedSuccessfully"));
		} catch (error) {
			toast.error(t("shared.errorGeneric"));
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};
	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>

			<div className="flex justify-center items-center gap-2">
				<IconButton
					icon={<Edit className="h-4 w-4" color="rgb(0, 0, 100)" />}
					className={"p-2 m-0 flex justify-center items-center"}
					onClick={() => router.push(`/admin/dashboard/users/user-detail/${data?.userId}`)}
				/>
				<IconButton
					icon={<Lock className="h-4 w-4" color="rgb(0, 0, 100)" />}
					className={"p-2 m-0 flex justify-center items-center"}
					onClick={() => router.push(`/admin/dashboard/users/change-password/${data?.userId}`)}
				/>
				<IconButton
					icon={<Trash className="h-4 w-4" color="#ab0303" />}
					className={"p-2 m-0 flex justify-center items-center"}
					onClick={() => setOpen(true)}
				/>
			</div>
		</>
	);
};

export default CellAction;

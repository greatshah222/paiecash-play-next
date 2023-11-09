"use client";

import CellAction from "./cell-action";

export const columns = [
	{
		accessorKey: "emailAddress",
		header: "form.user.email",
	},
	{
		accessorKey: "firstName",
		header: "form.profile.firstName",
	},

	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row?.original} />,
	},
];

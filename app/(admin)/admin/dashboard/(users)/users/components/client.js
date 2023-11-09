import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

const AdminUsersClient = ({ data }) => {
	return <DataTable columns={columns} data={data} searchKey="emailAddress" />;
};

export default AdminUsersClient;

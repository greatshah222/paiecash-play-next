import { cn } from "@/lib/utils";

const IconButton = ({ onClick, icon, className }) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				"rounded-full flex justify-center items-center bg-white border shadow-md p-2 hover:scale-110 transition ",
				className
			)}
		>
			{icon}
		</button>
	);
};

export default IconButton;

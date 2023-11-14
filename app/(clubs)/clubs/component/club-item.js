"use client";

import Image from "next/image";
import Link from "next/link";

const ClubItem = ({ club }) => {
	return (
		<Link href={`clubs/${club.name}/${club.organizationId}`}>
			<div
				className={
					"  border border-brand rounded-md  w-full h-full overflow-hidden  bg-brand flex flex-col  justify-between items-center "
				}
			>
				<div
					className={" bg-white flex justify-around items-center rounded-md  w-full flex-1 h-full "}
				>
					<div className="h-[100%] relative">
						<Image
							src={club.logoUrl ? club.logoUrl : "/images/default/default-club-logo.svg"}
							alt="Home Team"
							style={{
								borderRadius: "50px",
							}}
							className="my-5 h-[120px]"
							width={160}
							height={40}
							onError={(e) => (e.target.src = "/images/default/default-club-logo.svg")}
						/>
					</div>
				</div>
				<div className={"h-[30px] md:h-[40px] flex justify-center items-center"}>{club?.name}</div>
			</div>
		</Link>
	);
};

export default ClubItem;

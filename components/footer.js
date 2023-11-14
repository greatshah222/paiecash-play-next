"use client";
import Image from "next/image";
import Link from "next/link";

import Container from "./ui/container";
import Translations from "./Translations";
import Logo from "./Navbar/logo";

const ALL_PARTNERS = [
	{
		id: 1,
		src: "/images/partners/1.png",

		href: "https://www.visma.fi",
		label: "Visma",
	},
	{
		id: 2,
		src: "/images/partners/2.png",

		href: "https://netvisor.fi",
		label: "netvisor",
	},

	{
		id: 3,
		src: "/images/partners/3.png",
		href: "https://rajupaja.fi",
		label: "rajupaja",
	},
	{
		id: 4,
		src: "/images/partners/4.png",

		href: "https://www.visma.fi",
		label: "Visma",
	},
	{
		id: 5,
		src: "/images/partners/5.png",

		href: "https://www.visma.fi",
		label: "Visma",
	},
];

const ROUTES = [
	{
		id: 4,

		href: `https://salibandy.fi/fi/info/lahetykset/tietopaketti-kaikki-olennainen-salibandytvsta/`,

		label: "footer.info",

		target: "_blank",
	},
	{
		id: 3,

		href: "/tos",
		label: "footer.tos",
	},

	{
		id: 2,

		href: "/privacy-policy",
		label: "footer.privacy",
	},
	{
		id: 1,
		href: "/",
		label: "footer.contact",
		// target: "_blank",
	},
];
const SOME = [
	{
		id: 4,

		href: "https://www.facebook.com",
		label: "Facebook",
	},
	{
		id: 3,

		href: "https://www.instagram.com",
		label: "Instagram",
	},

	{
		id: 2,

		href: "https://www.tiktok.com",
		label: "TikTok",
	},
	{
		id: 1,
		href: "https://twitter.com",
		label: "Twitter",
	},
];

const Footer = () => {
	return (
		<footer className="bg-brand">
			{/* //powered by  */}

			<div className="h-28 bg-brandHover flex justify-center items-center">
				<div className="text-3xl font-probold text-center flex justify-center items-center text-white">
					PAIECASH PLAY POWERED BY:
				</div>
			</div>

			{/* // partner LoginModal */}

			<div className="h-40 bg-white">
				<div className="bg-white flex justify-between items-center  max-w-[800px] m-auto h-full">
					{ALL_PARTNERS.map((el) => (
						<Link href={el?.href} key={el?.id} target="_blank">
							<Image
								width={100}
								height={100}
								src={el?.src}
								alt={el?.label}
								className="mix-blend-multiply"
							/>
						</Link>
					))}
				</div>
			</div>

			<Container>
				<div className="flex flex-row justify-between w-full md:w-[60vw] mx-auto">
					<div className="flex flex-col gap-2 sm:gap-3">
						{ROUTES.map((el) => (
							<Link
								href={el?.href}
								key={el?.id}
								target={el?.target && el?.target}
								className={
									"text-sm sm:text-lg font-medium transition-colors hover:text-brandHover   w-full sm:w-auto text-center sm:text-start shadow-sm sm:shadow-none h-[35px] sm:h-auto"
								}
							>
								<Translations text={el?.label} />
							</Link>
						))}
					</div>

					<div className="flex justify-center items-center">
						<Logo src={"/images/default/logo-white.svg"} />
					</div>

					<div className="flex flex-col gap-2 sm:gap-3 items-end">
						{SOME.map((el) => (
							<Link
								href={el?.href}
								key={el?.id}
								target="_blank"
								className={
									"text-sm sm:text-lg font-medium transition-colors hover:text-brandHover   w-full sm:w-auto text-center  sm:text-start shadow-sm sm:shadow-none h-[35px] sm:h-auto "
								}
							>
								<Translations text={el?.label} />
							</Link>
						))}
					</div>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;

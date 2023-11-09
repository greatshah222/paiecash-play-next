"use client";
/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import { useEffect, useState } from "react";

import Container from "@/components/ui/container";
import Header from "@/components/ui/Header/header";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;
	return (
		<div className="bg-white ">
			<Container className={"bg-white h-full"}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Image
						className="aspect-video max-w-full max-h-full"
						src={"/images/contact/contactus.png"}
						alt="contact us page"
						width={600}
						height={600}
					/>

					<div className="text-gray-700 ">
						<Header title="YHTEYSTIEDOT (CONTACT)" className="text-brand" />

						<div className="my-10 text-md leading-7">
							SalibandyTV's support/customer service contact information SalibandyTV is a joint
							project of Suomen Salibandyliitto ry and Icareus Oy. You can contact either
							SalibandyTV's support or to the communication of the Finnish Floorball Federation.
						</div>

						<div>
							<Header
								title="SalibandyTV Support
"
								className="text-brand"
							/>

							<div className="my-10 text-md leading-7">salibandytv@salibandy.fi</div>
						</div>
						<div>
							<Header
								title="Jussi Ojala

"
								className="text-brand"
							/>

							<div className="my-10 text-md leading-7">
								<div>Director of Communications, Finnish Floorball Federation</div>
								<div>jussi.ojala@salibandy.fi</div>
								<div>040 7774831</div>
							</div>
						</div>

						<Button className="w-full md:w-auto" size="lg">
							<a
								className={"w-full"}
								href="mailto:salibandytv@salibandy.fi
"
							>
								Send Email
							</a>
						</Button>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default ContactPage;

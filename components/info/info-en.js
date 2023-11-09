"use client";

/* eslint-disable react/no-unescaped-entities */

import classes from "@/app/styles/documents.module.css";
import { Separator } from "@/components/ui/separator";

const InfoEnglish = () => {
	return (
		<ul>
			<div className={classes.container}>
				<div className={classes.title}>What is SalibandyTV and what is its purpose?</div>
				<Separator className="my-2" />
				<div className={classes.text}>
					SalibandyTV is the Finnish Floorball Association's own service and it was launched in the
					fall of 2022. SalibandyTV brings together all other broadcasts of Finnish floorball. The
					Finnish Floorball Association has agreed on the construction of the service with the
					Finnish company Icareus Oy. The cooperation is multi-year.
				</div>
				<div className={classes.text}>
					SalibandyTV has three clear goals:
					<li className={classes.text}>Serves the clubs' needs as well as possible</li>
					<li className={classes.text}>All Finnish floorball on the same channel</li>
					<li className={classes.text}>User-friendly and reliable service</li>
				</div>
				<div className={classes.text}>
					On SalibandyTV, clubs can broadcast both paid and free broadcasts. SalibandyTV's offer
					includes all matches under the Finnish Floorball Federation, with the exception of the
					F-Liiga. From the same service, you can watch matches from the smallest juniors all the
					way to the women's 1st division and the men's Divari, as well as from MAAJOUKKUETIE
					matches to Finland's national matches. The clubs themselves are responsible for the
					productions. Using the service to make broadcasts is free of charge for clubs
				</div>
				<div className={classes.text}>
					The key to the whole thing is that we are doing this genuinely for Finnish floorball and
					floorball clubs. The association invest in this, and when the club produces a broadcast
					for the SalibandyTV service, a clearly more significant part of the broadcast revenue is
					automatically billed directly to the club. Such high allocation percentages have not been
					reached before. This way, the clubs get a valid way to acquire resources for their
					activities, says Jussi Ojala, communications director of the Floorball Association.
				</div>
				<div className={classes.text}>
					SalibandyTV has been implemented by Icareus, with which the association has already built
					a connection with F-liigaTV aimed at foreign markets. Icareus is a pioneer of online
					videos in Finland, founded in 2001. The company's references include both small and large
					business clients, which are event organizers, companies, public administration operators,
					associations, content owners, TV channels, operators and media houses.
				</div>
				<div className={classes.text}>
					The best thing about this is that we get to do this for such a wide audience.Thousands of
					matches are streamed every year and there are many kinds of users, of course it has its
					challenges and it is also a huge opportunity. Almost all games these days come from some
					media – it's a wonderful thing to have everything in one service, Icareus development
					director Mikko Karppinen comments.
				</div>
			</div>
			<div className={classes.container}>
				<div className={classes.title}>This is how you watch matches on SalibandyTV</div>
				<Separator className="my-2" />

				<div className={classes.text}>– Open the address https://salibandy.tv</div>
				<div className={classes.text}>
					– SalibandyTV is always viewed on a browser-based basis, both on mobile and on a computer.
					SalibandyTV is not optimized for smart TV browser viewing, we recommend using mirroring
					for smart TV viewing. SalibandyTV's Android and iOS apps are for streaming, not viewing.
				</div>
				<div className={classes.text}>
					- Using and viewing the service always requires logging in. Viewing IDs can be created
					under "REGISTER":
					<a
						href="https://salibandy.tv/auth/signup"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="website address"
						className="ml-2"
					>
						https://salibandy.tv/auth/signup
					</a>
				</div>
				<div className={classes.text}>
					– Once you have created your credentials, go to "SIGN UP" and select "AS USER":
					<a
						href="https://salibandy.tv/auth/login"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="website address"
						className="ml-2"
					>
						https://salibandy.tv/auth/login
					</a>
				</div>
				<div className={classes.text}>
					- Select the tournament match you want from SalibandyTV. Click "BUY TICKETS". Choose
					either a single match or the right to watch the entire tournament. Manage the payment
					transaction. You can then watch the match(s) automatically.
				</div>
				<div className={classes.text}>
					– If you need support and instructions for logging in, purchasing or anywhere else, please
					contact SalibandyTV's on-call support:
					<a
						href="https://salibandy.fi/fi/info/lahetykset/salibandytv-tuki/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="website address for salibandy fi"
						className="ml-2"
					>
						https://salibandy.fi/fi/info/lahetykset/salibandytv-tuki/
					</a>
				</div>
			</div>

			<div className={classes.container}>
				<div className={classes.title}>YHTEYSTIEDOT (CONTACT)</div>

				<Separator className="my-2" />
				<div className={classes.text}>
					SalibandyTV's support/customer service contact information
				</div>

				<div className={classes.text}>
					SalibandyTV is a joint project of Suomen Salibandyliitto ry and Icareus Oy. You can
					contact either SalibandyTV's support, SalibandyTV's channel coordinator or directly to the
					communication of the Finnish Floorball Federation.
				</div>
				<div className={classes.text}>
					SalibandytTV support
					<br />
					salibandytv@salibandy.fi
					<br />
					<br />
					Contact information:
				</div>

				<div className={classes.text}>
					<div className="text-brandHover"> Jussi Ojala</div>
					Director of Communications, Finnish Floorball Federation
					<br />
					040 777 4831
					<br />
					jussi.ojala@salibandy.fi
				</div>
			</div>
			{/* <div className={classes.container}>
      <div className={classes.title}></div>
      <div className={classes.text}></div>
      <div className={classes.text}></div>
    </div> */}
		</ul>
	);
};

export default InfoEnglish;

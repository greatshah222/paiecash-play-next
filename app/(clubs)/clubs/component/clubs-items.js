"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SwiperSlide } from "swiper/react";

import classes from "./clubs-items.module.css";
import Container from "@/components/ui/container";
import ClubCarousel from "@/components/ui/ClubCarousel";
import Translations from "@/components/Translations";
import { useMyContext } from "@/context/StateHolder";
import Header from "@/components/ui/Header/header";
import { Input } from "@/components/ui/input";
import ClubItem from "./club-item";

const ClubsItems = ({ clubs, content, allLetter }) => {
	const { t } = useTranslation();

	const { initialLanguageLoaded } = useMyContext();
	const [contentItem, setContentItem] = useState(content);

	const [searchFieldInput, setSearchFieldInput] = useState("");
	const [activeAlphabet, setactiveAlphabet] = useState(
		typeof window !== "undefined" ? window?.location?.hash?.split("#")?.[1] : ""
	);

	useEffect(() => {
		if (searchFieldInput) {
			let y = [];
			content.forEach((el) => {
				if (el === searchFieldInput.split("")[0].toUpperCase()) {
					y.push(el);
				}
			});

			setContentItem(y);
		} else {
			setContentItem(content);
		}
	}, [searchFieldInput, content]);

	const ItemLink = ({ club, id }) => {
		return (
			<Link
				href={`clubs/${club.name}/${club.organizationId}`}
				className={`text-base ${classes.allLetter_alphabet_item}`}
				id={id}
			>
				<div key={club.groupId} className={`text-slate-900 probold hover:text-brand`}>
					{club.name}
				</div>
			</Link>
		);
	};

	const data = clubs?.map((club) => (
		<SwiperSlide key={club?.id}>
			<ClubItem club={club} />
		</SwiperSlide>
	));

	if (!clubs || !initialLanguageLoaded) return;

	return (
		<>
			<Container>
				<Header title={<Translations text="clubs.title" />} className="mt-5" />
			</Container>
			<div className="w-[94vw] mx-auto">
				<ClubCarousel hideArrow={false}>{data}</ClubCarousel>
			</div>

			<Container className={"pt-10 md:pt-[90px]"}>
				<Input
					className="border border-brand rounded-3xl placeholder:text-slate-400 text-center text-md max-w-3xl flex justify-center items-center mx-auto text-slate-900"
					placeholder={t("clubs.searchclub")}
					onChange={({ target }) => setSearchFieldInput(target.value)}
				/>
				<div className={classes.secondaryContainer}>
					<ul className={`${classes.allLetter} gap-5`}>
						{allLetter
							.toUpperCase()
							.split("")
							.map((el, i) => {
								return (
									<li
										key={`${el}${i}`}
										className={`text-2xl ${
											!content.includes(el)
												? "text-slate-300 pointer-events-none"
												: "text-slate-900"
										}   
									`}
									>
										<Link
											href={`/clubs#${el}`}
											onClick={() => setactiveAlphabet(el)}
											className={
												activeAlphabet?.toLowerCase() === el?.toLowerCase() && classes.activehash
											}
										>
											{el}
										</Link>
									</li>
								);
							})}
					</ul>
					<div className={`${classes.allLetter_alphabet} max-w-2xl`}>
						{contentItem.map((el, i) => {
							return (
								<div className={classes.allLetter_alphabet_primary} key={`${el}${i}`}>
									<div className={classes.container}>
										<div
											className={`font-semibold text-brand ${
												activeAlphabet?.toLowerCase() === el?.toLowerCase() && classes.activehash
											} text-xl`}
										>
											{el}
										</div>
										<div className={classes.allLetter_alphabet_item_content}>
											{clubs.map((club, i) => {
												return searchFieldInput
													? club.name.toUpperCase().split("")[0] === el &&
															club.name.toUpperCase().includes(searchFieldInput.toUpperCase()) && (
																<ItemLink club={club} el={el} key={`${el}${i}`} id={el} />
															)
													: club.name.toUpperCase().split("")[0] === el && (
															<ItemLink club={club} el={el} key={`${el}${i}`} id={el} />
													  );
											})}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</Container>
		</>
	);
};

export default ClubsItems;

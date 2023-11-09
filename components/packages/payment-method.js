"use client";

import Image from "next/image";

const PaymentMethod = ({ paymentMethod, onClick }) => {
	return (
		<div
			className={"w-[400px] h-[80px] relative max-w-full cursor-pointer "}
			onClick={() => onClick(paymentMethod.id, paymentMethod.key)}
		>
			<Image src={`/images/payment/${paymentMethod.key}.png`} alt={paymentMethod.name} fill />
		</div>
	);
};

export default PaymentMethod;

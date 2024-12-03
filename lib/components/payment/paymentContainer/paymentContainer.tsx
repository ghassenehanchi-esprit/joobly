import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Button from "@/lib/components/button/button";
import { ServicePlanType } from "@/lib/types/componentTypes";
import styles from "./paymentContainer.module.scss";

import { FaStripe } from "react-icons/fa";
import { extractFirstTwoDigits } from "@/lib/constant/helpers";
import { useCallback } from "react";

const PaymentContainer = (props: ServicePlanType) => {

	const numberOfPostPoints = extractFirstTwoDigits(props.title);



	//Stripe logic
	async function handleSubmit() {
		try {
			const response = await fetch("/api/checkout", {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					title: props.title,
					price: props.price,
					points: numberOfPostPoints
				}),
			});

			const { url } = await response.json();
				if (url) {
				window.location.href = url; // Правильное использование ссылки
				} else {
				console.error("URL not found in response");
				}
			/* replace("/jobs");
			refresh(); */
		} catch (error: unknown) {
			console.log(error);
		}
	};


	//paypal logic
	const createOrder = useCallback(async () => {
        console.log("Current price:", props.price); 
        const response = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: props.title,
                price: props.price,
                points: numberOfPostPoints,
            }),
        });

        const { id } = await response.json();
        return id;
    }, [props.title, props.price, numberOfPostPoints]);


	const orderRecord = async () => {
		const response = await fetch("/api/paypal/order-record", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: props.title,
                price: props.price,
                points: numberOfPostPoints,
            }),
        });

	}


	return (
		<section className={styles["payment-container"]}>
			<div className={styles["payment-container__labels"]}>
				<label className={styles["payment-container__labels__label"]}>
					Checkout<span>*</span>
				</label>
				<label className={styles["payment-container__labels__subLabel"]}>
					<div className="flex items-center gap-1 text-sm sm:text-base">
						Go to secure payment page powered by
						<FaStripe  className="w-9 h-9 text-[#009c77]"/>
					</div>
				</label>

				<Button className="bg-[#006c53] text-white text-xl font-bold py-3 sml:py-4 max-w-[750px] rounded-xl" onClick={handleSubmit}>
					Pay with Credit Card
				</Button>

				 {/* Кнопка для PayPal */}
				 <div className="w-full mt-2">
					<PayPalScriptProvider 
					options={{ 
						clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
						components: "buttons",
						currency: "CZK",
						"disable-funding": "credit,card,p24",
					}}>
						<div className="">
							<PayPalButtons
								style={{ 
									layout: "vertical", 
									borderRadius: 12 
								}}
								createOrder={createOrder}
								onApprove={async (data) => {
									const res = await fetch(`/api/paypal/capture-order`, {
										method: "POST",
										headers: { "Content-Type": "application/json" },
										body: JSON.stringify({ orderId: data.orderID }),
									});
									if (res.status === 200) {
										console.log(res);
										await orderRecord();
									}
									
								}}
								onError={(err) => {
									console.error("PayPal error", err);
								}}
							/>
						</div>
					</PayPalScriptProvider>
				 </div>
			</div>
		</section>
	);
};

export default PaymentContainer;
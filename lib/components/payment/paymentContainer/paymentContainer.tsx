import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Button from "@/lib/components/button/button";
import { ServicePlanType } from "@/lib/types/componentTypes";
import styles from "./paymentContainer.module.scss";

import { FaStripe } from "react-icons/fa";
import { extractFirstTwoDigits } from "@/lib/constant/helpers";

const PaymentContainer = (props: ServicePlanType) => {

	const numberOfPostPoints = extractFirstTwoDigits(props.title);

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
				<Button style={{ width: "100%" }} className={"btn-primary"} onClick={handleSubmit}>
					Go to Pay
				</Button>

				 {/* Кнопка для PayPal */}
				 <PayPalScriptProvider options={{ "clientId": process.env.PAYPAL_CLIENT_ID! }}>
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={async () => {
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
                        }}
                        onApprove={async (data, actions) => {
                            await fetch(`/api/paypal/capture-order`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ orderId: data.orderID }),
                            });
                            alert("Payment successful!");
                        }}
                        onError={(err) => {
                            console.error("PayPal error", err);
                        }}
                    />
                </PayPalScriptProvider>
			</div>
		</section>
	);
};

export default PaymentContainer;

import Button from "@/lib/components/button/button";
import { ServicePlanType } from "@/lib/types/componentTypes";
import styles from "./paymentContainer.module.scss";

import { FaCcStripe } from "react-icons/fa";
import { FaStripe } from "react-icons/fa";

const PaymentContainer = (props: ServicePlanType) => {
	const handleSubmit = async () => {
		try {
			const session = await fetch("/api/checkout", {
				method: "POST",
				body: JSON.stringify({
					title: props.title,
					price: props.price,
				}),
			});

			const data = await session.json();
			window.location.href = data.session.url;
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
			</div>
		</section>
	);
};

export default PaymentContainer;

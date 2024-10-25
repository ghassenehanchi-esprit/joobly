import Button from "@/lib/components/button/button";
import { ServicePlanType } from "@/lib/types/componentTypes";
import Image from "next/image";
import styles from "./paymentContainer.module.scss";

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
					Go to secure payment page powered by{" "}
					<Image src={"/images/logos/stripe.svg"} alt='stripe' width={70} height={70} />
				</label>
				<Button style={{ width: "100%" }} className={"btn-primary"} onClick={handleSubmit}>
					Go to Pay
				</Button>
			</div>
		</section>
	);
};

export default PaymentContainer;

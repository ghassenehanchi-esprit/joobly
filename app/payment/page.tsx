"use client";
import React, { useState } from "react";
import styles from "./paymenPage.module.scss";
import PaymentPlanCheckbox from "@/lib/components/payment/paymentPlanCheckbox/paymentPlanCheckbox";
import ServicePlans from "@/lib/components/servicePlans/servicePlans";
import PaymentContainer from "@/lib/components/payment/paymentContainer/paymentContainer";
import { ServicePlanType } from "@/lib/types/componentTypes";

const Payment = () => {
	const [monthly, setMonthly] = useState<boolean>(true);
	const [yearly, setYearly] = useState<boolean>(false);
	const [servicePlan, setServicePlan] = useState<ServicePlanType>({
		title: "Bronze",
		price: 0,
	});

	return (
		<section className={styles["payment-page"]}>
			<div className={styles["payment-page__wrapper"]}>
				{/* <PaymentPlanCheckbox
					monthly={monthly}
					yearly={yearly}
					setMonthly={setMonthly}
					setYearly={setYearly}
				/> */}
				<ServicePlans servicePlan={servicePlan} setServicePlan={setServicePlan} />
				{!!servicePlan && <PaymentContainer {...servicePlan} />}
			</div>
		</section>
	);
};

export default Payment;

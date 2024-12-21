"use client";
import React, { useEffect } from "react";
import styles from "./paymenPage.module.scss";
import ServicePlans from "@/lib/components/servicePlans/servicePlans";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setPackage } from "@/lib/features/packageSlice/packageSlice";
import PaymentContainer from "@/lib/components/payment/paymentContainer/paymentContainer";


const defaultPlan: any = {
	title: "1 Basic Job Post",
	price: 150,
	points: 1,
	percent: "30% Rebate",
	value: "150.00 CZK",
	isActive: true,
};

const Payment = () => {
	const dispatch = useDispatch();
	const selectedPackage = useSelector((state: RootState) => state.packages.selectedPackage);
	

	useEffect(() => {
		dispatch(setPackage(defaultPlan));
	}, [dispatch]);

	const handleServicePlanChange = (plan: any) => {
		dispatch(setPackage(plan));
	};

	return (
		<section className={styles["payment-page"]}>
			<div className={styles["payment-page__wrapper"]}>
				
				<ServicePlans servicePlan={selectedPackage} setServicePlan={handleServicePlanChange} />
				{!!selectedPackage && <PaymentContainer props={selectedPackage} />}
			</div>
		</section>
	);
};

export default Payment;

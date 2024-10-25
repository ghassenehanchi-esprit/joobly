import React from "react";
import styles from "./servicePlans.module.scss";
import PlanContainer from "@/lib/components/payment/planContainer/planContainer";
import { PLANS } from "@/lib/constant/constants";
import { ServicePlanType } from "@/lib/types/componentTypes";

interface ServicePlansPropsTypes {
	setServicePlan: (value: ServicePlanType) => void;
	servicePlan: ServicePlanType;
}

const ServicePlans = ({ setServicePlan, servicePlan }: ServicePlansPropsTypes) => {
	const plans = PLANS.map((item) => {
		if (item.planPrice === servicePlan.price) {
			item.isActive = true;
		} else {
			item.isActive = false;
		}
		return item;
	});

	return (
		<section className={styles["service-plans"]}>
			<div className={styles["service-plans__labels"]}>
				<label className={styles["service-plans__labels__label"]}>
					Service Plans<span>*</span>
				</label>
				<label className={styles["service-plans__labels__subLabel"]}>
					Choose the service that suits your needs
				</label>
			</div>
			<div className={styles["service-plans__wrapper"]}>
				{plans.map(({ logo, data, planPrice, title, isActive }, index) => (
					<PlanContainer
						onClick={() =>
							setServicePlan({
								title: `${title} Plan`,
								price: planPrice,
							})
						}
						key={index}
						isActive={isActive}
						title={title}
						data={data}
						logo={logo}
						planPrice={planPrice}
					/>
				))}
			</div>
		</section>
	);
};

export default ServicePlans;

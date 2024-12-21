import React from "react";
import styles from "./servicePlans.module.scss";
import PlanContainer from "@/lib/components/payment/planContainer/planContainer";
import { PLANS } from "@/lib/constant/constants";
import { ServicePlanType } from "@/lib/types/componentTypes";

interface ServicePlansPropsTypes {
	setServicePlan: (value: ServicePlanType) => void;
	servicePlan: ServicePlanType;
}

const ServicePlans = ({ setServicePlan, servicePlan }: any) => {
	const plans = PLANS.map((item) => ({
		...item,
		isActive: item.planPrice === servicePlan.price, 
	}));

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
			<div className={'flex flex-col gap-4 lg:flex-row mdl:gap-10'}>
				{plans.map(({ logo, data, planPrice, title, isActive }, index) => (
					<PlanContainer
						onClick={() =>
							setServicePlan({
								title: `1 ${title} Joob Post`,
								price: planPrice,
								points: 1,
								isActive: true
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

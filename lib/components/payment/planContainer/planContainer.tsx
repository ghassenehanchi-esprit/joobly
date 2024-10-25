import React from "react";
import Paper from "@/lib/components/paper/Paper";
import Image from "next/image";
import styles from "./planContainer.module.scss";
import PlanPermissions from "@/lib/components/payment/planContainer/planPermissions/planPermissions";
import Button from "@/lib/components/button/button";
import { PlanContainerDataType } from "@/lib/types/componentTypes";
interface PlanContainerPropsTypes extends PlanContainerDataType {
	onClick: () => void;
}

const PlanContainer = ({
	logo,
	planPrice = 0,
	data,
	title,
	onClick,
	isActive,
}: PlanContainerPropsTypes) => {
	return (
		<Paper
			style={{
				background: title === "Gold" ? "#1D2427" : "#F6F8F9",
				height: "55rem",
				width: "30%",
				border: isActive ? " 2px solid #009C77" : "unset",
			}}
		>
			<section className={styles["plan-container"]}>
				<div className={styles["plan-container__title"]}>
					<Image width={48} height={48} src={logo} alt='' />
					<h1
						className={`${styles["plan-container__title__text"]} ${
							title === "Gold" && styles["gold-plan"]
						}`}
					>
						{title}
					</h1>
				</div>
				<p className={styles["plan-container__sub-title"]}>
					{title === "Bronze" ? "Perfect plan to get started" : "Paid plan with features"}
				</p>
				<p
					className={`${styles["plan-container__plan-per-month"]} ${
						title === "Gold" && styles["gold-plan"]
					}`}
				>
					{planPrice} CZK /month
				</p>
				<p
					className={`${styles["plan-container__plan-description"]}  ${
						title === "Gold" && styles["gold-plan"]
					}`}
				>
					{title === "Bronze"
						? "The free plan gives you access to some of the great features of Gostart."
						: null}
				</p>
				<PlanPermissions title={title} data={data} />
				<div className={styles["plan-container__submit"]}>
					<Button
						onClick={onClick}
						style={{ width: "100%", height: "56px" }}
						className={
							title === "Gold" ? `btn-plans-white green-text` : `btn-green-outlined green-text`
						}
					>
						Select
					</Button>
				</div>
			</section>
		</Paper>
	);
};

export default PlanContainer;

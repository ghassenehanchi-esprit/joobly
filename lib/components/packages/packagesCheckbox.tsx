"use client";
import React from "react";
import styles from "../../components/packages/packagesCheckbox.module.scss";
import RadioCheckbox from "../radioCheckbox/RadioCheckbox";
import Image from "next/image";
import percent_icon from "../../../public/images/icons/discount.svg";
import value_icon from "../../../public/images/icons/dollar-circle.svg";
import ellipse from "../../../public/images/icons/Ellipse.svg";
import { PackageType } from "@/lib/types/componentTypes";

interface PackageCheckboxProps {
	title: string;
	percent: string;
	value: string;
	checked: boolean;
	onChange: (packageInfo: PackageType) => void;
}

const PackagesCheckbox = ({ title, percent, value, checked, onChange }: PackageCheckboxProps) => {
	return (
		<section
			className={`${styles["packages-checkbox__container"]} ${checked ? styles.checked : ""}`}
		>
			<div className={styles["packages-checkbox__checkboxes__checkbox"]}>
				<div className={styles["packages-checkbox__image-label-wrapper"]}>
					<RadioCheckbox
						checked={checked}
						onChange={(e) => onChange({ title, percent, value, active: checked })}
					/>
					<label>{title}</label>
				</div>
			</div>

			<Image
				className={styles["packages-ellipse_img"]}
				src={ellipse}
				alt={ellipse}
				width={7}
				height={7}
			/>

			<div className={styles["packages-checkbox__checkboxes__checkbox"]}>
				<div className={styles["packages-checkbox__image-label-wrapper"]}>
					<Image
						className={styles["packages-checkbox__image"]}
						src={percent_icon}
						alt='percent_icon'
					/>
					<label>{percent}</label>
				</div>
			</div>

			<Image
				className={styles["packages-ellipse_img"]}
				src={ellipse}
				alt={ellipse}
				width={7}
				height={7}
			/>

			<div className={styles["packages-checkbox__checkboxes__checkbox"]}>
				<div className={styles["packages-checkbox__image-label-wrapper"]}>
					<Image className={styles["packages-checkbox__image"]} src={value_icon} alt='value_icon' />
					<label>{value}</label>
				</div>
			</div>
		</section>
	);
};

export default PackagesCheckbox;

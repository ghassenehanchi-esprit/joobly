"use client";
import React from "react";
import styles from "../../components/packages/packagesCheckbox.module.scss";
import RadioCheckbox from "../radioCheckbox/RadioCheckbox";
import Image from "next/image";
import percent_icon from "../../../public/images/icons/discount.svg";
import ellipse from "../../../public/images/icons/Ellipse.svg";
import { PackageType } from "@/lib/types/componentTypes";

interface PackageCheckboxProps {
	title: string;
	percent: string;
	price: number;
	value: string;
	checked: boolean;
	points: number;
	onChange: (packageInfo: PackageType) => void;
}

const PackagesCheckbox = ({ title, price, points, percent, value, checked, onChange }: PackageCheckboxProps) => {
	return (
                <section
                        className={`${styles["packages-checkbox__container"]} ${checked ? styles.checked : ""} w-full`}
                >
                        <div className={styles["packages-checkbox__checkboxes__checkbox"]}>
                                <div className={styles["packages-checkbox__image-label-wrapper"]}>
                                        <RadioCheckbox
                                                checked={checked}
                                                onChange={(e) => onChange({ title, points, price, percent, value, active: checked })}
                                        />
                                        <label>{title}</label>
                                </div>
                        </div>

                        <Image
                                className={`${styles["packages-ellipse_img"]} hidden lg:block`}
                                src={ellipse}
                                alt='separator'
                                width={7}
                                height={7}
                        />

                        <div className={`${styles["packages-checkbox__checkboxes__checkbox"]} w-full lg:w-auto`}>
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
                                className={`${styles["packages-ellipse_img"]} hidden lg:block`}
                                src={ellipse}
                                alt='separator'
                                width={7}
                                height={7}
                        />

                        <div className={`${styles["packages-checkbox__checkboxes__checkbox"]} w-full lg:w-auto`}>
                                <div className={`${styles["packages-checkbox__image-label-wrapper"]} justify-between w-full gap-2 lg:gap-4`}>
                                        <label className="text-base lg:text-lg">{value}</label>
                                        <span className="hidden text-sm text-gray-500 lg:inline">{points} points</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500 lg:hidden w-full mt-1">
                                        <span>{percent}</span>
                                        <span>{points} points</span>
                                </div>
                        </div>
                </section>
        );
};

export default PackagesCheckbox;

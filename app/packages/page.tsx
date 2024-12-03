"use client";
import React, { useState } from "react";
import styles from "./packagesPage.module.scss";
import packagesBg from "../../public/images/packageBg.svg";
import Image from "next/image";
import PostJobActions from "@/lib/components/postJobActions/postJobActions";
import { PACKAGES, POST_PACKAGES_ACTIONS } from "@/lib/constant/constants";
import checkMark from "@/public/images/icons/checkmark.svg";
import PackagesCheckbox from "@/lib/components/packages/packagesCheckbox";
import PaymentContainer from "@/lib/components/payment/paymentContainer/paymentContainer";
import { PackageType, ServicePlanType } from "@/lib/types/componentTypes";

const PackagesPage = () => {
    const [selectedPackage, setSelectedPackage] = useState<PackageType>(PACKAGES[0]); // Установка первого пакета по умолчанию

    const changePackage = (packageInfo: PackageType) => {
        console.log("Selected package:", packageInfo);
        setSelectedPackage(packageInfo); // Обновляем выбранный пакет
    };


    const servicePlan = (packageItem: PackageType): ServicePlanType => {
        return {
            title: packageItem.title as string,
            price: parseFloat(packageItem.value.split(" ")[0]),
        };
    };


    return (
        <section className={styles["packages_page"]}>
            <div className={styles["about_contex"]}>
                <div className={styles["about_contex__image"]}>
                    <Image src={packagesBg} alt="Package's Background" />
                </div>
                <div className={styles["about_contex__list"]}>
                    <h1>Advantages</h1>
                    <PostJobActions data={POST_PACKAGES_ACTIONS} image={checkMark} color="black" />
                </div>
            </div>
            <div className={styles["packages-page__wrapper"]}>
                <label className={styles["components_head"]}>Select your package</label>

                {PACKAGES?.map((item, index) => (
                    <PackagesCheckbox
                        key={index}
                        title={item.title}
                        percent={item.percent}
                        value={item.value}
                        checked={selectedPackage.title === item.title}
                        onChange={changePackage}
                    />
                ))}
            </div>
            <PaymentContainer {...servicePlan(selectedPackage)} />
            <label className={styles["ending_text_head"]}> Want to post more?</label>
            <p className={styles["ending_text"]}>
                Please contact us and we will find a personalized solution for you.
            </p>
        </section>
    );
};

export default PackagesPage;
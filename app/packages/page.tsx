"use client";
import styles from "./packagesPage.module.scss";
import packagesBg from "../../public/images/packageBg.svg";
import Image from "next/image";
import PostJobActions from "@/lib/components/postJobActions/postJobActions";
import { PACKAGES, POST_PACKAGES_ACTIONS } from "@/lib/constant/constants";
import checkMark from "@/public/images/icons/checkmark.svg";
import PackagesCheckbox from "@/lib/components/packages/packagesCheckbox";
import PaymentContainer from "@/lib/components/payment/paymentContainer/paymentContainer";
import { PackageType } from "@/lib/types/componentTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setPackage } from "@/lib/features/packageSlice/packageSlice";
import Link from "next/link";

const PackagesPage = () => {
    const dispatch = useDispatch();
    const selectedPackage = useSelector((state: RootState) => state.packages.selectedPackage);

    const changePackage = (packageInfo: PackageType) => {
        dispatch(setPackage(packageInfo));
    };
    
    {/*
      const servicePlan = {
        title: selectedPackage.title,
        price: selectedPackage.price,
        points: selectedPackage.points as number
      };
    */}


    return (
        <section className={styles["packages_page"]}>
            <div className={styles["about_contex"]}>
                <div className={styles["about_contex__list"]}>
                    <h1>Advantages</h1>
                    <PostJobActions data={POST_PACKAGES_ACTIONS} color="black" />
                </div>
                <div className={styles["about_contex__image"]}>
                    <Image src={packagesBg} width={600} height={400} alt="Package's Background" />
                </div>
            </div>
            <div className={styles["packages-page__wrapper"]}>
                <label className={styles["components_head"]}>Select your package</label>

                {PACKAGES?.map((item, index) => (
                    <PackagesCheckbox
                        key={index}
                        title={item.title}
                        price={item.price}
                        points={item.points}
                        percent={item.percent}
                        value={item.value}
                        checked={selectedPackage.title === item.title}
                        onChange={changePackage}
                    />
                ))}
            </div>
            <PaymentContainer /> {/* selector initialization in component + */}
            <label className={styles["ending_text_head"]}> Want to post more?</label>
            <p className={styles["ending_text"]}>
                Please <Link className="text-[#006c53] underline hover:text-[#009c77] duration-200" href="/contact">contact</Link> us and we will find a personalized solution for you.
            </p>
        </section>
    );
};

export default PackagesPage;
'use client'
import React from 'react';
import styles from "./paymentPlanCheckbox.module.scss"
import RadioCheckbox from "@/lib/components/radioCheckbox/RadioCheckbox";
interface PaymentPlanCheckboxProps{
  monthly:boolean,
  setMonthly:(value:boolean)=>void,
  yearly:boolean,
  setYearly:(value:boolean)=>void
}
const PaymentPlanCheckbox = ({monthly,setMonthly,yearly,setYearly}:PaymentPlanCheckboxProps) => {

  return (
    <section className={styles["payment-plan-checkbox"]}>
      <div className={styles["payment-plan-checkbox__labels"]}>
        <label className={styles["payment-plan-checkbox__labels__label"]}>Payment Plan <span>*</span></label>
        <label className={styles["payment-plan-checkbox__labels__subLabel"]}>Choose the service that suits your
          needs</label>
      </div>
      <div className={styles["payment-plan-checkbox__checkboxes"]}>
        <div className={`${styles["payment-plan-checkbox__checkboxes__checkbox"]} ${monthly && styles["checked"]}`}>
          <label>Monthly</label>
          <RadioCheckbox checked={monthly} onChange={(e) => {
            setMonthly(e.target.checked)
            if (e.target.checked) {
              setYearly(false)
            }
          }}/>
        </div>
        <div className={`${styles["payment-plan-checkbox__checkboxes__checkbox"]} ${yearly && styles["checked"]}`}>
          <label>Yearly</label>
          <RadioCheckbox checked={yearly} onChange={(e) => {
            setYearly(e.target.checked)
            if (e.target.checked) {
              setMonthly(false)
            }
          }}/>
        </div>
      </div>
      <p className={styles["payment-plan-checkbox__bottom-label"]}>
        Select one of the options above.
      </p>
    </section>
  );
};

export default PaymentPlanCheckbox;
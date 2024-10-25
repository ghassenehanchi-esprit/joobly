import React from 'react';
import styles from "./paymentMethodContainer.module.scss";
import RadioCheckbox from "@/lib/components/radioCheckbox/RadioCheckbox";
import Image from "next/image";
import paypalFirst from "@/public/images/logos/payPalLogoFirst.svg";
import paypalSecond from "@/public/images/logos/payPalLogoSecond.svg";
import visa from "@/public/images/logos/visaCard.svg";
import master from "@/public/images/logos/master.svg";
import discover from "@/public/images/logos/discover.svg";
import amex from "@/public/images/logos/amex.svg";

interface PaymentMethodContainerPropsTypes{
  isPayPal:boolean,
  isCard:boolean,
  setIsPayPal:(value:boolean)=>void
  setIsCard:(value:boolean)=>void
}
const PaymentMethodContainer = ({isPayPal,setIsPayPal,setIsCard,isCard}:PaymentMethodContainerPropsTypes) => {
  return (
    <div className={styles["payment-container-method"]}>
      <div className={`${styles["payment-container-method__item"]} ${isPayPal && styles["active"]}`}>
        <div className={styles["payment-container-method__item__context"]}>
          <RadioCheckbox checked={isPayPal} onChange={(e) => {
            setIsPayPal(e.target.checked)
            if (e.target.checked) {
              setIsCard(false)
            }
          }}/>
          <div className={styles["payment-container-method__item__context__labels"]}>
            <label>Paypal</label>
            <p>Safe payment online. credit card needed</p>
            <p> Paypal account is not necessary.</p>
          </div>
        </div>
        <div className={styles["payment-container-method__item__logos"]}>
          <Image width={24} height={24} src={paypalFirst} alt=""/>
          <Image width={68} height={24} src={paypalSecond} alt=""/>
        </div>
      </div>
      <div className={`${styles["payment-container-method__item"]} ${isCard && styles["active"]}`}>
        <div className={styles["payment-container-method__item__context"]}>
          <RadioCheckbox checked={isCard} onChange={(e) => {
            setIsCard(e.target.checked)
            if (e.target.checked) {
              setIsPayPal(false)
            }
          }}/>
          <div className={styles["payment-container-method__item__context__labels"]}>
            <label>Credit Card</label>
            <p>Safe money transfer using your bank account.</p>
            <p> Visa, maestro, discover, american express.</p>
          </div>
        </div>
        <div className={styles["payment-container-method__item__logos"]}>
          <Image width={52} height={52} src={visa} alt=""/>
          <Image width={52} height={52} src={master} alt=""/>
          <Image width={52} height={52} src={discover} alt=""/>
          <Image width={52} height={52} src={amex} alt=""/>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodContainer;
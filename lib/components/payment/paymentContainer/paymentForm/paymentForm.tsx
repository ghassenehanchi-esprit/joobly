'use client'
import React from 'react';
import styles from "./paymentForm.module.scss"
import {Divider} from "@mui/material";
import Input from "@/lib/components/input/input";
import { usePaymentInputs } from "react-payment-inputs";
interface PaymentFormPropsTypes{
  errors:any,
  control:any
}
const PaymentForm = ({errors,control}:PaymentFormPropsTypes) => {
  const { getCardNumberProps } = usePaymentInputs();
  const { getExpiryDateProps } = usePaymentInputs();

  return (
    <section className={styles["payment-form"]}>
      <Divider/>
      <div className={styles["payment-form__fields"]}>

          <Input isRequired control={control} inputProps={getCardNumberProps({})} authInput  errors={errors} name={"cardNumber"}
                 label="CREDIT CARD NUMBER"
          />
          <div className={styles["payment-form__fields__wrapper"]}>
            <Input isRequired control={control} placeholder="CVV" type="number" authInput  errors={errors} name={"cvvCode"}
                   label="CVV CODE"
            />
            <Input isRequired control={control} inputProps={getExpiryDateProps({})} authInput  errors={errors} name={"expireDate"}
                   label="EXPIRE DATE"
            />
          </div>
          <div className={styles["payment-form__fields__wrapper"]}>
            <Input isRequired control={control} placeholder="Enter owner name" authInput  errors={errors} name={"cardOwnerName"}
                   label="NAME ON CARD"
            />
          </div>

      </div>
    </section>
  );
};

export default PaymentForm;
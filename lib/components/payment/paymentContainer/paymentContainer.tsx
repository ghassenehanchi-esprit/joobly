"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useMemo, useState } from "react";
import { FaStripe } from "react-icons/fa";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Button from "@/lib/components/button/button";
import { RootState } from "@/lib/store";
import { ServicePlanType } from "@/lib/types/componentTypes";

import styles from "./paymentContainer.module.scss";

interface PaymentContainerProps {
  props?: Partial<ServicePlanType>;
}

const PaymentContainer = ({ props }: PaymentContainerProps) => {
  const router = useRouter();
  const selectedPackage: ServicePlanType = useSelector(
    (state: RootState) => state.packages.selectedPackage
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const packageDetails = useMemo(() => {
    return {
      title: props?.title ?? selectedPackage?.title ?? "",
      price: Number(props?.price ?? selectedPackage?.price ?? 0),
      points: Number(props?.points ?? selectedPackage?.points ?? 0),
    };
  }, [props, selectedPackage]);

  const amount = packageDetails.price;
  const currency = "CZK";

  const handleSubmit = async () => {
    if (!packageDetails.title || !packageDetails.price) {
      toast.error("Please select a package before continuing.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: packageDetails.title }),
        credentials: "include",
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMessage =
          payload?.error ||
          payload?.message ||
          "Unable to start Stripe checkout session";

        if (response.status === 401) {
          toast.error("Please sign in before purchasing a package.");
          router.push("/login?callbackUrl=/packages");
          return;
        }

        throw new Error(errorMessage);
      }

      const { url } = payload as { url?: string };

      if (url) {
        window.location.assign(url);
      } else {
        throw new Error("Stripe session URL not found");
      }
    } catch (error) {
      console.error("Stripe checkout error", error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : "We couldn't start the Stripe checkout. Please try again.";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const createOrder = async () => {
    const response = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(packageDetails),
    });

    const { id } = await response.json();
    return id;
  };

  const orderRecord = async () => {
    const response = await fetch("/api/paypal/order-record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(packageDetails),
    });

    if (response.ok) {
      router.push("/success");
    } else {
      toast((t) => (
        <span className="flex flex-col gap-4 text-red-400 text-center items-center mb-2">
          <span className="font-medium">Payment failed.</span>
          <button onClick={() => toast.dismiss(t.id)}>close</button>
        </span>
      ));
    }
  };

  return (
    <section className={styles["payment-container"]}>
      <div className={styles["payment-container__labels"]}>
        <label className={styles["payment-container__labels__label"]}>
          Checkout<span>*</span>
        </label>
        <label className={styles["payment-container__labels__subLabel"]}>
          <div className="flex items-center gap-1 text-sm sm:text-base">
            Go to secure payment page powered by
            <FaStripe className="w-9 h-9 text-[#009c77]" />
          </div>
        </label>

        <Button
          className="bg-[#006c53] text-white text-xl font-bold py-3 sml:py-4 max-w-[750px] rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Redirecting…" : "Pay with Credit Card"}
        </Button>

        <div className="w-full mt-2">
          <PayPalScriptProvider
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
              components: "buttons",
              currency,
              "disable-funding": "credit,card,p24",
            }}
          >
            <div className="">
              <PayPalButtons
                style={{
                  layout: "vertical",
                  borderRadius: 12,
                }}
                disabled={false}
                forceReRender={[amount, currency]}
                fundingSource={undefined}
                createOrder={createOrder}
                onApprove={async (data) => {
                  const res = await fetch(`/api/paypal/capture-order`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId: data.orderID }),
                  });
                  if (res.status === 200) {
                    await orderRecord();
                  }
                }}
                onError={(err) => {
                  console.error("PayPal error", err);
                }}
              />
            </div>
          </PayPalScriptProvider>
        </div>
      </div>
    </section>
  );
};

export default PaymentContainer;

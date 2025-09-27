"use client";


import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SuccessContent = () => {

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Confirming your payment…");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setMessage("We could not find your payment session.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch("/api/checkout/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const payload = await response.json();

        if (!response.ok || payload?.success === false) {
          throw new Error(payload?.message || payload?.error || "");
        }

        setStatus("success");
        setMessage(
          payload?.message || "Your payment was confirmed successfully."
        );
      } catch (error) {
        console.error("Stripe confirmation failed", error);
        setStatus("error");
        setMessage(
          error instanceof Error && error.message
            ? error.message
            : "We were unable to confirm your payment."
        );
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-semibold text-slate-900">
          {status === "success" ? "Payment successful" : "Payment status"}
        </h1>
        <p className="mt-4 text-base text-slate-600">{message}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/packages"
            className="inline-flex items-center justify-center rounded-full bg-[#006c53] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#009c77]"
          >
            Browse packages
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );

};

const SuccessPage = () => {
  return (
    <Suspense fallback={<section className="px-4 py-16">Loading…</section>}>
      <SuccessContent />
    </Suspense>
  );

};

export default SuccessPage;

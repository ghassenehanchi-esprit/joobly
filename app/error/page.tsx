"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 3500);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-[85%] bg-red-500">
      <h1 className="text-4xl font-bold text-white">Payment cancelled</h1>
      <p className="text-lg text-white">No charges were made. You can try again at any time.</p>
    </div>
  );
};

export default ErrorPage;

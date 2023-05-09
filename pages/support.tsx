import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import React from "react";

const Support = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p className="mb-5">Support page not ctreated yet</p>
      <Button title="Back Home" onClick={() => router.push("/")} />
    </div>
  );
};

export default Support;

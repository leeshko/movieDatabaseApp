"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className="text-center mt-10">
      <h1>Something went wrong. Please try again later.</h1>
      <button
        className="hover:text-amber-600 cursor-pointer"
        onClick={() => {
          reset();
          redirect("/");
        }}
      >
        Try Again
      </button>
    </div>
  );
};

export default Error;

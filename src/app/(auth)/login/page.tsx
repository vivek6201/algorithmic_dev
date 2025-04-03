import { AuthForm } from "@/components/site/pages/auth/AuthForm";
import React from "react";

export default function page() {
  return (
    <div className="min-h-[800px] flex flex-col gap-y-10 justify-center items-center">
      <h2 className="text-4xl font-extrabold">
        Welcome Back, to{" "}
        <span className="bg-gradient-to-r from-blue-300 to-purple-500 text-transparent bg-clip-text">
          Algorithmic Dev
        </span>
      </h2>
      <AuthForm isLogin={true} />
    </div>
  );
}

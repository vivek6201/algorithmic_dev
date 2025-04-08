import Footer from "@/components/site/shared/Footer";
import Header from "@/components/site/shared/Header";
import { auth } from "@/lib/auth";
import React, { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

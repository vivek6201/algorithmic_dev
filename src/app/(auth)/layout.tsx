import Footer from "@/components/site/shared/Footer";
import Header from "@/components/site/shared/Header";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

import BottomBar from "@/components/site/shared/BottomBar";
import Footer from "@/components/site/shared/Footer";
import Header from "@/components/site/shared/Header";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <Header />
      {children}
      <Footer />
      <BottomBar />
    </div>
  );
}

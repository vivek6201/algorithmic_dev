import AdminSidebar from "@/components/site/pages/admin/Sidebar";
import Breadcrumbs from "@/components/site/shared/Breadcrumb";
import ThemeToggler from "@/components/site/shared/theme-toggler";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin | Algorithmic Dev",
  description:
    "A One-Stop Solution for all your tech related queries. Be it Jobs, tutorials, courses, blogs, helper mini apps",
};

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-5 overflow-y-auto">
        <div className="flex justify-between items-center">
          <Breadcrumbs />
          <div className="-translate-y-2">
            <ThemeToggler />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

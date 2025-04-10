import AdminSidebar from "@/components/site/pages/admin/Sidebar";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin | Algorithmic Dev",
  description:
    "A One-Stop Solution for all your tech related queries. Be it Jobs, tutorials, courses, blogs, helper mini apps",
};

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;

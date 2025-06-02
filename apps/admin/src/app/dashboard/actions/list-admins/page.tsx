import { AdminClient, adminColumns } from '@/components/site/pages/actions/Admin';
import AdminTable from '@/components/site/pages/actions/AdminTable';
import React from 'react';

export default function page() {
  return (
    <div className="flex flex-col gap-y-5">
      <AdminClient />
      <AdminTable columns={adminColumns} />
    </div>
  );
}

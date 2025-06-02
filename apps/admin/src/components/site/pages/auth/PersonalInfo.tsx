'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function PersonalInfo() {
  const session = useSession();

  return (
    <div className="flex flex-col gap-y-5 p-5 rounded-md dark:bg-neutral-800 bg-gray-200">
      <div>
        <p className="font-bold text-xl">Personal Information</p>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Here you can see your personal Information
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FieldBlock name="Name" value={session.data?.user?.name ?? ''} />
        <FieldBlock name="Email" value={session.data?.user?.email ?? ''} />
        <FieldBlock name="Role" value={session.data?.user?.role ?? ''} />
      </div>
    </div>
  );
}

function FieldBlock({ value, name }: { name: string; value: string }) {
  return (
    <div className="flex flex-col">
      <p className="text-xs opacity-80">{name}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

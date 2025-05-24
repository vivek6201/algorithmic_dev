'use client';
import { Button } from '@repo/ui/components/ui/button';
import { Pen } from '@repo/ui';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import PersonalForm from './forms/PersonalForm';
import { UserDataResponseType } from '@/helpers/main/userDataGetter';

export default function ProfileClientLeft({ data: userData }: UserDataResponseType) {
  const { data } = useSession();
  const [isEdit, setEdit] = useState(false);

  const closeEdit = () => setEdit(false);

  return (
    <div className="w-full h-full p-5 flex flex-col gap-y-5">
      {/* Image Block */}
      <div className="relative w-full aspect-square flex items-center justify-center">
        <div className="rounded-full w-24 h-24 md:w-72 md:h-72 overflow-hidden">
          {data?.user?.image ? (
            <Image
              src={data?.user?.image}
              width={500}
              height={500}
              alt="profile-image"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-neutral-800 flex justify-center items-center" />
          )}
        </div>
        <Button
          className="rounded-full absolute z-20 right-8 bottom-8 dark:bg-black bg-white hover:dark:bg-neutral-800 hover:bg-gray-100"
          variant={'outline'}
          size={'icon'}
        >
          <Pen className="w-5 h-5 dark:text-white" />
        </Button>
      </div>
      {!isEdit ? (
        <div className="flex flex-col ml-2">
          <h2 className="font-bold text-xl md:text-2xl capitalize">{data?.user?.name}</h2>
          <p className=" opacity-75">{data?.user?.email}</p>
          <p className="opacity-75">{data?.user?.role}</p>
          <p className="my-2">Student | Freelancer </p>
          <Button variant={'outline'} className="mt-2" size={'sm'} onClick={() => setEdit(true)}>
            Edit Profile
          </Button>
        </div>
      ) : (
        <PersonalForm closeEdit={closeEdit} userData={userData} />
      )}
    </div>
  );
}

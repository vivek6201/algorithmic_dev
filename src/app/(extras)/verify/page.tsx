'use client';

import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function page() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = decodeURIComponent(searchParams.get('email') ?? '');

  console.log({ token, email });

  const handleEmailVerification = async () => {
    setLoading(true);

    try {
      const {
        data: { success, message },
      } = await axios.post('/api/user/verify', {
        token,
        email,
      });

      if (!success) {
        throw new Error(message);
      }

      setSuccess(true);
    } catch (error) {
      console.error(error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleEmailVerification();
  }, []);

  const renderContent = (success: boolean) => {
    if (!success) {
      return (
        <>
          <Image src={'/fail-icon.png'} width={500} height={500} alt="fail" />
          <p className="font-bold text-xl">Email Verification Failed!</p>
        </>
      );
    }

    return (
      <>
        <Image src={'/success-icon.svg'} width={500} height={500} alt="Success" />
        <p className="font-bold text-xl">Email Verified Successfully!</p>
      </>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col gap-y-5 items-center justify-center">
        <Loader2 className="animate-spin text-2xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-y-5 items-center justify-center">
      {renderContent(success)}
    </div>
  );
}

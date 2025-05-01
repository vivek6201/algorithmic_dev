import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token, email } = await req.json();

  if (!token || !email) {
    return NextResponse.json({ success: false, message: 'Token or email missing' });
  }

  // First, find the verification token
  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      identifier: email,
      token: token,
    },
  });

  // Check if token exists and matches
  if (!verificationToken || verificationToken.token !== token) {
    return NextResponse.json({ success: false, message: 'Invalid token' });
  }

  // Check if token has expired
  if (new Date() > verificationToken.expires) {
    return NextResponse.json({ success: false, message: 'Token has expired' });
  }

  // Token is valid, verify the user
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
    },
  });

  return NextResponse.json({ success: true, message: 'User Verified Successfully!' });
}

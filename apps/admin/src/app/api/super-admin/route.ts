import { Admin, prisma } from '@repo/db';
import cache from '@repo/shared/cache';
import { NextResponse } from 'next/server';
import { omit } from '@repo/shared/utils';

export const GET = async () => {
  try {
    let admins = await cache.get<Admin[]>('admin-list', []);

    if (!admins) {
      admins = await prisma.admin.findMany({});

      if (admins) cache.set<Admin[]>('admin-list', [], admins, 10);
    }

    const adminsWithoutPassword = admins.map((admin: Admin) => omit(admin, ['password']));

    return NextResponse.json(
      {
        success: true,
        data: adminsWithoutPassword,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

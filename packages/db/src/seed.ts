import bcrypt from 'bcryptjs';
import { prisma } from '.';

async function main() {
  const admin = await prisma.admin.upsert({
    where: {
      email: 'algorithmicdev9@gmail.com',
    },
    create: {
      name: 'Vivek Kumar Gupta',
      email: 'algorithmicdev9@gmail.com',
      password: await bcrypt.hash('vivek1234', 10),
      role: 'SuperAdmin',
    },
    update: {
      name: 'Vivek Kumar Gupta',
      password: await bcrypt.hash('vivek1234', 10),
      role: 'SuperAdmin',
    },
  });

  console.log(`seeded with data: ${admin}`);
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

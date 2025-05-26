import bcrypt from 'bcryptjs';
import { prisma } from '.';

async function main() {
  const admin = await prisma.admin.create({
    data: {
      name: 'Vivek Kumar Gupta',
      email: 'algorithmicdev9@gmail.com',
      password: await bcrypt.hash('vivek1234', 10),
      role: 'SuperAdmin',
    },
  });
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

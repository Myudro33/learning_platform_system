import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  // Seed roles
  const roles = await prisma.role.createMany({
    data: [
      { id: 1, name: 'admin' },
      { id: 2, name: 'instructor' },
      { id: 3, name: 'student' },
    ],
  });
  const users = await prisma.user.createMany({
    data: [
      {
        id: 1,
        name: 'nika',
        email: 'nika@gmail.com',
        password: bcrypt.hashSync('nika123', 10),
        roleId: 1,
      },
      {
        id: 2,
        name: 'saba',
        email: 'saba@gmail.com',
        password: bcrypt.hashSync('nika123', 10),
        roleId: 2,
      },
      {
        id: 3,
        name: 'luka',
        email: 'luka@gmail.com',
        password: bcrypt.hashSync('nika123', 10),
        roleId: 3,
      },
    ],
  });
  console.log('successfully seeded roles and users');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

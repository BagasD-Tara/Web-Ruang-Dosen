import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      name: 'Admin Kampus',
      email: 'admin@test.com',
      password: passwordHash,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // 2. Create Lecturer
  const lecturer = await prisma.user.upsert({
    where: { email: 'dosen@test.com' },
    update: {},
    create: {
      name: 'Dosen Ariel',
      email: 'dosen@test.com',
      password: passwordHash,
      role: 'LECTURER',
    },
  });
  console.log(`✅ Lecturer created: ${lecturer.email}`);

  // 3. Create Student
  const student = await prisma.user.upsert({
    where: { email: 'student@test.com' },
    update: {},
    create: {
      name: 'Mahasiswa Rajin',
      email: 'student@test.com',
      password: passwordHash,
      role: 'STUDENT',
    },
  });
  console.log(`✅ Student created: ${student.email}`);

  console.log('✅ Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

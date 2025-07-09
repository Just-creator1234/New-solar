// prisma/seed.js or seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: 'author@sunlink.com' },
    update: {},
    create: {
      id: 'sunlink-author',
      email: 'author@sunlink.com',
      name: 'Sunlink Admin'
    }
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

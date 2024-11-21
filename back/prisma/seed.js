const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            name: 'Admin',
            email: 'admin@respira.com',
            password: 'admin123',
            role: 'admin',
        },
    });
}

main()
    .then(() => console.log('Banco populado!'))
    .catch((e) => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
  });
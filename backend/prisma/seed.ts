import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Limpar dados existentes
  console.log("🗑️  Limpando dados existentes...");
  await prisma.product.deleteMany();

  // Criar products
  console.log("📦 Criando products...");
  const product1 = await prisma.product.create({
    data: {
      name: "Notebook Dell",
      description: "Notebook Dell Inspiron 15 com processador Intel i7",
      price: 3500.0,
      stockQuantity: 15,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Mouse Logitech",
      description: "Mouse sem fio Logitech MX Master 3",
      price: 299.99,
      stockQuantity: 50,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Teclado Mecânico",
      description: "Teclado mecânico RGB com switches Cherry MX",
      price: 450.0,
      stockQuantity: 25,
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: "Monitor LG 27",
      description: "Monitor LG 27 polegadas 4K UltraWide",
      price: 1200.0,
      stockQuantity: 8,
    },
  });

  const product5 = await prisma.product.create({
    data: {
      name: "Headset HyperX",
      description: "Headset gamer HyperX Cloud Flight sem fio",
      price: 599.99,
      stockQuantity: 20,
    },
  });

  console.log("✅ Seed completed successfully!");
  console.log(`Products inserted: ${[product1, product2, product3, product4, product5].length}`);
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

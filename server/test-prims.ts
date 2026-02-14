import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
async function main() {
  const users = await p.user.findMany();
  console.log("Success!", users);
}
main();

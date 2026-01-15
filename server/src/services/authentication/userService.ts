import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email: email } });
  return user;
};

export const makeUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
};

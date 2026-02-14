import { prisma } from "../../prisma";

export const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (user) {
    return user;
  }
  return 0;
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id: id } });
  if (user) {
    return user;
  }
  return 0;
};

export const makeUser = async (
  username: string,
  email: string,
  password: string
) => {
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
  return user;
};

import { prisma } from "../../prisma";
import { Prisma, User } from "@prisma/client";

export const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (user) {
    return user;
  }
  return 0;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id: id } });
  if (user) {
    return user;
  }
  return 0;
};

export const makeUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const user = await prisma.user.create({
    data: {
      fullName: username,
      email: email,
      passwordHash: password,
    },
  });
  return user;
};

export const updateUser = async (
  id: string,
  data: Prisma.UserUpdateInput,
): Promise<User> => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string): Promise<User> => {
  return await prisma.user.delete({
    where: { id },
  });
};

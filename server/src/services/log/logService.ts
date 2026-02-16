import { prisma } from "../../prisma";

export const getAllLogs = async () => {
  const logs = await prisma.dailyLog.findMany();

  return logs;
};

export const getLogById = async (id: string) => {
  const log = await prisma.dailyLog.findFirst({
    where: {
      id: id,
    },
  });

  return log;
};

import { LogData } from "src/b/b1";
import { prisma } from "../../prisma";
import { Prisma } from "@prisma/client";
import { handlePrismaError } from "src/utils/errorHandler";

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

export const makeLogService = async (logData: LogData) => {
  try {
    const newLog = await prisma.dailyLog.create({
      data: {
        dayNumber: logData.dayNumber,
        date: new Date(logData.date),
        originalContent: logData.originalContent,
        internshipId: logData.internshipId,

        finalContent: logData.finalContent,
        isAiImproved: logData.isAiImproved,
        status: logData.status,
      },
    });

    return { success: true, data: newLog };
  } catch (error: unknown) {
    handlePrismaError(error, "Failed to make the daily log. Please try again.");
  }
};

export const updateLogService = async (id: string, logData: LogData) => {
  try {
    const updatedLog = await prisma.dailyLog.update({
      where: { id: id },
      data: {
        originalContent: logData.originalContent,
        finalContent: logData.finalContent,
      },
    });

    return { succcess: true, data: updatedLog };
  } catch (error: unknown) {
    handlePrismaError(
      error,
      "Failed to update the daily log. Please try again.",
    );
  }
};

export const deleteLogService = async (id: string) => {
  try {
    await prisma.dailyLog.delete({ where: { id: id } });

    return { success: true };
  } catch (error: unknown) {
    handlePrismaError(
      error,
      "Failed to delete the daily log. Please try again.",
    );
  }
};

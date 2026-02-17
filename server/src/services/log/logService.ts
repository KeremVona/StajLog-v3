import { LogData } from "src/b/b1";
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
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error(
        `A log for day ${logData.dayNumber} already exists for this internship.`,
      );
    }

    console.error("Error making daily log:", error);
    throw new Error("Failed to make the daily log. Please try again.");
  }
};

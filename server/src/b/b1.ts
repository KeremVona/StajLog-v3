import { LogStatus } from "@prisma/client";

export interface LogData {
  dayNumber: number;
  date: Date | string;
  originalContent: string;
  internshipId: string;

  finalContent?: string;
  isAiImproved?: boolean;
  status?: LogStatus;
}

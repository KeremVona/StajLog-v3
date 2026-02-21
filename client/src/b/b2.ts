export interface LogData {
  id: string;
  dayNumber: number;
  date: Date | string;
  originalContent: string;
  internshipId: string;

  finalContent?: string;
  isAiImproved?: boolean;
}

export interface LogParams {
  id?: string;
}

export interface LogParamsUpdate {
  id?: string;
  data: LogData;
}

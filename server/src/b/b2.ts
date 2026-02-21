import { DailyLog, ReportTemplate, User } from "@prisma/client";

export interface InternshipData {
  id: string;
  title: string;
  companyName: string;
  startDate: Date | string;
  endDate?: Date | string | null;
  userId: string;
  templateId?: string | null;
  madeAt: Date | string;
  updatedAt: Date | string;
  user?: User;
  template?: ReportTemplate;
  logs?: DailyLog[];
}

export interface MakeInternshipDTO {
  title: string;
  companyName: string;
  startDate: Date | string;
  endDate?: Date | string | null;
  userId: string;
  templateId?: string | null;
}

export interface UpdateInternshipDTO {
  title?: string;
  companyName?: string;
  startDate?: Date | string;
  endDate?: Date | string | null;
  templateId?: string | null;
}

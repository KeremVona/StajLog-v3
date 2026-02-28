import { type LogData } from "./b2";
import { type User } from "./b1";

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
  logs?: LogData[];
}

export interface MakeInternshipDTO {
  title: string;
  companyName: string;
  startDate: Date | string;
  endDate?: Date | string | null;
  templateId?: string | null;
}

export interface UpdateInternshipDTO {
  title?: string;
  companyName?: string;
  startDate?: Date | string;
  endDate?: Date | string | null;
  templateId?: string | null;
}

export interface ReportTemplate {
  id: string;
  name: string;
  university: string;
  fileUrl: string;
  internships: InternshipData;
}

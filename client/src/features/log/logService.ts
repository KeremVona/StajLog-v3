import API from "../../api/api";
import type { LogData } from "../../b/b2";

const getAllLogs = async (): Promise<LogData[]> => {
  const response = await API.get("/log/");

  return response.data;
};

const getLogById = async (id: string): Promise<LogData> => {
  const response = await API.get(`/log/${id}`);

  return response.data;
};

const makeLog = async (logData: LogData): Promise<LogData> => {
  const response = await API.post("/log/", logData);

  return response.data;
};

const updateLog = async (params: {
  id: string;
  logData: LogData;
}): Promise<LogData> => {
  const { id, logData } = params;
  const response = await API.put(`/log/${id}`, logData);

  return response.data;
};

const deleteLog = async (id: string) => {
  await API.delete(`/log/${id}`);

  return id;
};

const logService = {
  getAllLogs,
  getLogById,
  makeLog,
  updateLog,
  deleteLog,
};

export default logService;
